import React from "react";
import { connect } from "react-redux";

import { faShoppingBag, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "@component/navigation/cart-badge/cart-badge.module.css";

const CartBadge = props => {
  const badgeClasses = `${classes.faStack} fa-stack fa-1x`;
  const items = Object.keys(props.cart).length;
  const cartItems =
    items > 0 && props.isLoggedIn ? { "data-count": items } : null;
  return (
    <div>
      <span className={badgeClasses} {...cartItems}>
        <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
        <FontAwesomeIcon
          icon={faShoppingBag}
          className="fa-stack-1x fa-inverse"
        />
      </span>
    </div>
  );
};

const mapStateToProps = state => {
  const { cart } = state.user;
  const { isLoggedIn } = state.app;
  return { cart, isLoggedIn };
};

export default connect(mapStateToProps)(CartBadge);
