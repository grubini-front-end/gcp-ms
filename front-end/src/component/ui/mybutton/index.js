import React from "react";

import classes from "@component/ui/mybutton/mybutton.module.css";

const Mybutton = props => {
  return (
    <div
      className={classes.wrapper}
      disabled={props.disabled}
      onClick={props.click}
      style={props.styles}
    >
      {props.children}
    </div>
  );
};

export default Mybutton;
