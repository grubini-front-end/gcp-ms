import React, { Fragment } from "react";

import Toolbar from "@component/navigation/toolbar";

const layout = props => {
  return (
    <Fragment>
      <Toolbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default layout;
