import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { selectProduct } from "@container/app/store/action";
import { addOneToProduct } from "@component/cart/store/action";

import classes from "@component/products/product/product.module.css";

const Product = props => {
  const cardRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const product = props.product;
  const ClickMuncher = ({ children }) => {
    return (
      <div
        onClick={e => {
          e.stopPropagation();
          props.addProduct([product.id][0]);
          setClicked(true);
        }}
      >
        {children}
      </div>
    );
  };
  const clickedProduct = () => {
    new Promise((resolve, reject) => {
      return resolve(props.setSelection(product.id));
    }).then(() => {
      props.history.push("/product");
    });
  };

  return (
    <Col className="mb-5">
      <div ref={cardRef} onClick={clickedProduct}>
        <Card className={`${classes.box} ${classes.card} ${classes.clickable}`}>
          <Card.Img variant="top" src={product.picture} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <h4>{product.cost}</h4>
            <ClickMuncher>
              <Button
                className={classes.elevatedButton}
                variant="outline-dark"
                disabled={!props.isLoggedIn}
                block
              >
                Add to Cart
              </Button>
            </ClickMuncher>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

const mapStateToProps = state => {
  const { productIdSelected, token, isLoggedIn } = state.app;
  const { cart } = state.user;
  return {
    productIdSelected,
    isSignedIn: token,
    hasItems: Object.entries(cart).length !== 0,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelection: payload => dispatch(selectProduct(payload)),
    addProduct: payload => dispatch(addOneToProduct(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
