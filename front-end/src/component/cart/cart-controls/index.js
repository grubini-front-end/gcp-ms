import React from "react";
import { ButtonGroup, Row } from "react-bootstrap";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyButton from "@component/ui/mybutton";
import classes from "@container/checkout/checkout-item/checkout-controls/checkout-controls.module.css";

const btnStyle = {
  color: "white",
  backgroundColor: "red",
  height: "100%",
  width: "24%",
};


export default function BuildControls(props) {
  const addClickHandler = (value) => {
    props.addOneToProduct(props.product.id, +value);
  };
  const substractClickHandler = (value) => {
    props.substractOneFromProduct(props.product.id, +value);
  };

  return (
    <Row className={classes.customRow}>
      <ButtonGroup className={classes.buttonGroup}>
        <MyButton click={substractClickHandler} styles={btnStyle}>
          <FontAwesomeIcon icon={faMinus} />
        </MyButton>
        <div className={classes.divWrapper}>
          <input
            value={props.product.qty}
            onChange={(event) => addClickHandler(event.target.value)}
            disabled={props.enabled}
            type="number"
            min="0"
            className={classes.customInput}
          />
        </div>
        <MyButton
          click={() => addClickHandler(props.product.qty + 1)}
          styles={{ ...btnStyle, backgroundColor: "green" }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </MyButton>
      </ButtonGroup>
    </Row>
  );
}


// remove the connected component part as it is not ney parent will connect to the store 
//and pass the data and props to children 