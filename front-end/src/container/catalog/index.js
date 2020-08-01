import React, { Component, Fragment } from "react";

import Products from "@component/products";

export class Catalog extends Component {
  render() {
    return (
      <Fragment>
        <Products />
      </Fragment>
    );
  }
}

export default Catalog;
