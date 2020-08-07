import {
  CREATE_ORDER_URL,
  gcp_service_post as GCPServicePost,
} from "@network/gcp-service";
import axios from "axios";

import { COMPLETE_CHECKOUT } from "@component/cart/store/action";

export const ship_order = payload => {
  console.log("did i get here");
  console.log(payload);
  const { order, success_callback } = payload;
  const { cart, total } = order;
  return dispatch => {
    console.log("did it get here to the dispatch");
    return axios
      .post(CREATE_ORDER_URL, { cart, total: parseInt(total) })
      .then(response => {
        console.log("did it send?");
        console.log(response);
      })
      .then(_ => {
        success_callback();
        return dispatch({
          type: COMPLETE_CHECKOUT,
        });
      });
  };
};
