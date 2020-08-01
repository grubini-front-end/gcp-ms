import React, { memo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "@container/checkout/checkout-item/checkout-item.module.css";
import CartControls from "@component/cart/cart-controls";

const CheckoutSpec = memo(props => {
  const product = props.source ? props.product : props.selectedProduct;

  return (
    <Card className={classes.itemGap}>
      <Card.Header>
        <Row>
          <Col>
            <h5>{product.name}</h5>
          </Col>
          <div className={classes.titleStock} style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                marginLeft: "4%",
                width: "15%",
              }}
            >
              <p>Unit price:</p>
              <strong>${parseFloat(product.cost).toFixed(2)}</strong>
            </div>

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
            <CartControls
              enabled={props.enabled}
              product={product}
              addOneToProduct={props.addOneToProduct}
              substractOneFromProduct={props.substractOneFromProduct}
              spec={true}
            />
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

export default withRouter(connect(mapStateToProps)(CheckoutSpec));
