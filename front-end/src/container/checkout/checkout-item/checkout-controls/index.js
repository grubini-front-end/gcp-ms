import React, { useRef, memo, useState } from "react";
import { ButtonGroup, Row } from "react-bootstrap";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import {
  addProductToCart,
  removeProduct,
  addOneToProduct,
  substractOneFromProduct,
  setQuantityManually,
} from "@component/cart/store/action";

import MyButton from "@component/ui/mybutton";
import classes from "@container/checkout/checkout-item/checkout-controls/checkout-controls.module.css";
const btnStyle = {
  color: "white",
  backgroundColor: "red",
  height: "100%",
  width: "24%",
};
const BuildControls = memo(props => {
  const inputRef = useRef(null);
  const { product } = props.product;
  const addClickHandler = () => {
    props.addOneToProduct(+product.id);
  };
  const substractClickHandler = () => {
    props.substractOneFromProduct(product.id);
  };
  const addManuallyClickHandler = () => {
    props.setQuantityManually({
      id: product.id,
      qty: +inputRef.current.value,
    });
  };
  return (
    <Row className={classes.customRow}>
      <ButtonGroup className={classes.buttonGroup}>
        <MyButton click={substractClickHandler} styles={btnStyle}>
          <FontAwesomeIcon icon={faMinus} />
        </MyButton>
        <div className={classes.divWrapper}>
          <input
            ref={inputRef}
            value={product.qty}
            onChange={addManuallyClickHandler}
            disabled={props.enabled}
            type="number"
            min="0"
            className={classes.customInput}
          />
        </div>
        <MyButton
          click={addClickHandler}
          styles={{ ...btnStyle, backgroundColor: "green" }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </MyButton>
      </ButtonGroup>
    </Row>
  );
});

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: payload => dispatch(addProductToCart(payload)),
    removeProduct: payload => dispatch(removeProduct(payload)),
    addOneToProduct: payload => dispatch(addOneToProduct(payload)),
    substractOneFromProduct: payload =>
      dispatch(substractOneFromProduct(payload)),
    setQuantityManually: payload => dispatch(setQuantityManually(payload)),
  };
};
export default connect(null, mapDispatchToProps)(BuildControls);
