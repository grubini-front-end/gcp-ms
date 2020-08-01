import {
  PRODUCTS_URL,
  gcp_service_get as GCPServiceGet,
} from "@network/gcp-service";

import { SET_PRODUCTS } from "@component/products/store/action";
// { errorHandler, successHandler }
export const fetchProducts = () => {
  return dispatch => {
    return GCPServiceGet(PRODUCTS_URL)
      .then(response => response.data)
      .then(products => {
        let modProducts = {};
        Object.entries(products).map((element, index) => {
          const prd = element[1];
          modProducts = {
            ...modProducts,
            [prd.id]: {
              id: [prd.id][0],
              name: prd.name,
              description: prd.description,
              picture: `https://storage.googleapis.com/gcp-ms/${prd.picture.slice(
                20
              )}`,
              cost: prd.cost,
            },
          };
        });
        return dispatch({
          type: SET_PRODUCTS,
          payload: modProducts,
        });
      });
  };
};
