import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "@hoc/layout";

import Catalog from "@container/catalog";
import ProductDetail from "@container/catalog/product-detail";
import History from "@container/history";
import Checkout from "@container/checkout";
import { setSignIn } from "@container/app/store/action";
import { fetchProducts } from "@container/app/store/network";
import classes from "@container/app/app.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const expires_at = localStorage.getItem("expires_at");
    if (token && expires_at) {
      this.props.setSignInToken({ token, expires_at });
    }
    this.props.fetchProducts();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/product" component={ProductDetail} />
        <Route path="/" component={Catalog} />
      </Switch>
    );
    if (this.props.isLoggedIn && this.props.token) {
      routes = (
        <Switch>
          <Route path="/history" component={History} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/product" component={ProductDetail} />
          <Route path="/" component={Catalog} />
        </Switch>
      );
    }
    return (
      <Layout>
        <Container className={classes.container}>
          <Row className={classes.subRow}>{routes}</Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { isLoggedIn, session } = state.app;
  const { token } = session;
  return {
    token,
    isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSignInToken: payload => dispatch(setSignIn(payload)),
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
