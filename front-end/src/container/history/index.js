import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

import Order from "@container/history/order";
import { getOrders } from "@container/history/store/network";

export class History extends Component {
  constructor(props) {
    super(props);
    this.props.getOrderHistory();
  }

  generateOrders = () => {
    if (this.props.hasHistory) {
      return Object.entries(this.props.orderHistory).map((entry, index) => {
        return (
          <Order
            key={`entry-${index}`}
            entry={{ ...entry[1], name: this.prd["name"] }}
          />
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={4}>
            <h4>No orders at this time</h4>
          </td>
        </tr>
      );
    }
  };
  render() {
    return (
      <Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nº</th>
              <th>date</th>
              <th>cost</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>{this.generateOrders()}</tbody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { history } = state.user;
  return {
    orderHistory: history,
    hasHistory: Object.entries(history).length > 0,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistory: () => dispatch(getOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
