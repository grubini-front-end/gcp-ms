import React, { Fragment, useState } from "react";
import { Navbar, Nav, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link, withRouter } from "react-router-dom";

import CartBadge from "@component/navigation/cart-badge";
import { setSignIn, signOut } from "@container/app/store/action";
import { completeCheckout } from "@component/cart/store/action";
import classes from "@component/navigation/toolbar/navbar.module.css";

const Toolbar = props => {
  const [thinking, setThinking] = useState(false);
  let buttonToggleClass = "outline-success";
  let buttonToggleText = "Sign in";
  if (props.token && props.isLoggedIn) {
    buttonToggleClass = "outline-danger";
    buttonToggleText = "Log out";
  }
  const toggleSpinner = thinking ? <Spinner animation="border" /> : null;
  const signInClickHandler = response => {
    const { tokenObj } = response;
    const { id_token, expires_at } = tokenObj;

    localStorage.setItem("token", id_token);
    localStorage.setItem("expires_at", expires_at);

    props.setSignInToken({ token: id_token, expires_at });
    setThinking(false);
  };
  const authValidation = () => {
    if (props.token && props.isLoggedIn) {
      return (
        <Fragment>
          <Link className={classes.noStyle} to="/checkout">
            <CartBadge />
          </Link>
          <Link className={`${classes.link} ${classes.noStyle}`} to="/history">
            History
          </Link>
        </Fragment>
      );
    }
    return null;
  };
  const renderAuthButton = () => {
    if (!props.isLoggedIn && !props.token) {
      return (
        <GoogleLogin
          clientId="210361718211-h04qiioltch054a6kdpmul4cm28csc8s.apps.googleusercontent.com"
          render={renderProps => (
            <Button
              variant={buttonToggleClass}
              onClick={renderProps.onClick}
              size="md"
              className="ml-4"
            >
              {buttonToggleText}
            </Button>
          )}
          onRequest={() => setThinking(true)}
          onSuccess={signInClickHandler}
          onFailure={response => {
            setThinking(false);
            console.log("failure");
            console.log(response);
          }}
          cookiePolicy={"single_host_origin"}
        />
      );
    } else {
      return (
        <GoogleLogout
          clientId="210361718211-h04qiioltch054a6kdpmul4cm28csc8s.apps.googleusercontent.com"
          buttonText="Logout"
          render={renderProps => (
            <Button
              variant={buttonToggleClass}
              onClick={renderProps.onClick}
              size="md"
              className="ml-4"
            >
              {buttonToggleText}
            </Button>
          )}
          onLogoutSuccess={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("expires_at");
            props.signOutAction();
            props.resetCart();
            props.history.replace("/");
          }}
        ></GoogleLogout>
      );
    }
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#">GCP Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="toolbar">
        <Nav className="ml-auto">
          <Link className={`${classes.link} ${classes.noStyle}`} to="/">
            Home
          </Link>
          {authValidation()}
        </Nav>
        <Nav className="ml-auto">
          {toggleSpinner}
          {renderAuthButton()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  const { isLoggedIn, session } = state.app;
  const { token } = session;
  return {
    isLoggedIn,
    token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSignInToken: payload => dispatch(setSignIn(payload)),
    signOutAction: () => dispatch(signOut()),
    resetCart: () => dispatch(completeCheckout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
