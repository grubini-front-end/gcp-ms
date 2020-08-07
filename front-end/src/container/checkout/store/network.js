import {
  CREATE_ORDER_URL,
  gcp_service_post as GCPServicePost,
} from "@network/gcp-service";

import { COMPLETE_CHECKOUT } from "@component/cart/store/action";

export const ship_order = payload => {
  console.log("did i get here");
  console.log(payload);
  const { order, success_callback } = payload;
  const { cart, total } = order;
  return dispatch => {
    // return fetch(CREATE_ORDER_URL, {
    //   method: "POST",
    //   body: JSON.stringify(order),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    console.log("here");
    return GCPServicePost(
      CREATE_ORDER_URL,
      { ...order },
      { "Content-Type": "aplication/json" }
    ).then(response => {
      console.log("=======>>>");
      console.log(response);
    });
  };

  //   .then(_ => {
  //     success_callback();
  //     return dispatch({
  //       type: COMPLETE_CHECKOUT,
  //     });
  //   });
};
