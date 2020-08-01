import React, { Fragment } from "react";

import Spinner from "@component/ui/spinner";

const loader = props => {
  const { error } = props;
  if (props.loading) return <Spinner />;
  else if (error.status) return <p>{error.message}</p>;
  else return <Fragment>{props.children}</Fragment>;
};

export default loader;
