import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ProductSpec from "@component/products/product/product-spec";
import classes from "@container/catalog/product-detail/product-detail.module.css";

const ProductDetailContainer = props => {
  const exitClickHandler = () => props.history.replace("/");
  return (
    <div className={classes.spark}>
      <ProductSpec id={props.selectedId} cancel={exitClickHandler} />
    </div>
  );
};

const mapStateToProps = state => {
  const { cart } = state.user;
  const { productIdSelected } = state.app;
  return { selectedId: productIdSelected, cart };
};

export default withRouter(connect(mapStateToProps)(ProductDetailContainer));
