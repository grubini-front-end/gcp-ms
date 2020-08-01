import React from "react";
import { connect } from "react-redux";

import Product from "@component/products/product";
import { CardDeck } from "react-bootstrap";

const ProductGenerator = props => {
  const products = props.products;
  const generator = () => {
    return products.map((item, index) => {
      return <Product product={item[1]} key={`index-${index}-${item.id}`} />;
    });
  };
  return (
    <CardDeck className="row row-cols-1 row-cols-md-3">{generator()}</CardDeck>
  );
};

const mapStateToProps = state => {
  const { products } = state.catalog;
  return {
    products: Object.entries(products),
  };
};

export default connect(mapStateToProps)(ProductGenerator);
