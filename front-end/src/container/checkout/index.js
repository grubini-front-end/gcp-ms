import React, { Fragment, memo, useCallback, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import CheckoutSpec from "@container/checkout/checkout-item/";
import MyModal from "@component/ui/modal";
import classes from "@container/checkout/checkout.module.css";
import { Redirect, withRouter } from "react-router-dom";
import {
  addProductToCart,
  removeProduct,
  addOneToProduct,
  substractOneFromProduct,
  setQuantityManually,
  completeCheckout,
} from "@component/cart/store/action";
import { ship_order } from "@container/checkout/store/network";

const Checkout = memo(props => {
  const { cart } = props;
  const [show, setShow] = useState(false);
  const cancelClickHandler = useCallback(
    id => {
      if (Object.keys(cart).length === 0) {
        return <Redirect to="/" />;
      } else {
        props.removeProduct(id);
      }
    },
    [props, cart]
  );
  const calculateTotal = () => {
    return Object.entries(props.cart).reduce((accumulator, item) => {
      const product = item[1];
      return accumulator + product.cost * product.qty;
    }, 0);
  };
  const generateOrderSummaryList = useCallback(() => {
    return Object.keys(cart).map((item, index) => {
      return (
        <CheckoutSpec
          key={`id-${index}`}
          enabled={false}
          product={{ ...cart[item], id: item }}
          addOneToProduct={props.addOneToProduct}
          substractOneFromProduct={props.substractOneFromProduct}
          cancel={() => cancelClickHandler(item)}
          source={true}
        />
      );
    });
  }, [
    cancelClickHandler,
    props.addOneToProduct,
    props.substractOneFromProduct,
    cart,
  ]);
  const completionClickHandler = () => {
    console.log("can you see this");
    const order = {
      cart: props.cart,
      total: parseFloat(calculateTotal()).toFixed(2),
    };
    props.ship_order({
      order,
      success_callback: () => {
        props.history.replace("/");
      },
    });
    // props.completeCheckout();
    // props.history.replace("/");
  };
  const generateModal = () => {
    return (
      <MyModal
        title={"Your order has been placed"}
        show={show}
        cancel={() => setShow(false)}
        complete={completionClickHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Get excited!</h3>
        <h5>your products are on the way</h5>
        <h5>please continue to finalize the process</h5>
      </MyModal>
    );
  };

  return Object.keys(cart).length === 0 ? (
    <Redirect to="/" />
  ) : (
    <Fragment>
      <div className={classes.totalPrice}>
        <h4>${parseFloat(calculateTotal()).toFixed(2)}</h4>
      </div>
      {generateOrderSummaryList()}
      <div className={classes.checkOut}>
        <Button onClick={() => setShow(true)} variant="primary" size="lg" block>
          Check out
        </Button>
      </div>
      {generateModal()}
    </Fragment>
  );
});

const mapStateToProps = state => {
  const { cart } = state.user;
  return {
    cart: cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: payload => dispatch(removeProduct(payload)),
    addProductToCart: payload => dispatch(addProductToCart(payload)),
    addOneToProduct: (id, value) => dispatch(addOneToProduct(id, value)),
    substractOneFromProduct: payload =>
      dispatch(substractOneFromProduct(payload)),
    setQuantityManually: payload => dispatch(setQuantityManually(payload)),
    completeCheckout: () => dispatch(completeCheckout()),
    ship_order: payload => dispatch(ship_order(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
