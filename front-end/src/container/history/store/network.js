import {
  URL_ORDERS,
  gcp_service_get as GCPServiceGet,
} from "@network/gcp-service";
import { SET_HISTORY } from "@component/cart/store/action";

export const getOrders = () => {
  return dispatch => {
    return GCPServiceGet(URL_ORDERS).then(response => {
      return dispatch({
        type: SET_HISTORY,
        payload: response.data,
      });
    });
  };
};

export const getProduct = payload => {
  // return dispatch => {
  //   return GCPServiceSet()
  //     .get(`${PRODUCT_URL}66VCHSJNUP`)
  //     .then(response => console.log(response));
  // };
};
