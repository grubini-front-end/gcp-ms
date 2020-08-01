import React, { memo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addProductToCart,
  removeProduct,
  addOneToProduct,
  substractOneFromProduct,
  setQuantityManually,
} from "@component/cart/store/action";

import classes from "@component/products/product/product-spec/product-spec.module.css";

const ProductSpec = memo(props => {
  const product = props.source ? props.product : props.selectedProduct;
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <h5>{product.name}</h5>
          </Col>
          <div className={classes.titleStock}>
            <div id={classes.exit} onClick={props.cancel}>
              <FontAwesomeIcon icon={faTimesCircle} size="lg" />
            </div>
          </div>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Img variant="top" src={product.picture} />
          </Col>
          <Col xs sm lg="6" className={classes.controlsColumn}>
            <p>{product.description}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});

const mapStateToProps = (state, ownProps) => {
  const { products } = state.catalog;

  return {
    selectedProduct: { ...products[ownProps.id], id: ownProps.id },
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSpec)
);
