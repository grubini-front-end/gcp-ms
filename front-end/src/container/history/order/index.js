import React, { Fragment } from "react";

const Order = props => {
  console.log("this is the entry");
  console.log(props.entry);
  return (
    <Fragment>
      <tr>
        <td>{props.entry.id}</td>
        <td>{props.entry.date}</td>
        <td>{props.entry.cost}</td>
        <td>{props.entry.name}</td>
      </tr>
    </Fragment>
  );
};

export default Order;
