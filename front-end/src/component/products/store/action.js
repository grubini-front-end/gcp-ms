export const SET_PRODUCTS = "SET_PRODUCTS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const getProducts = () => {
  return {
    type: SET_PRODUCTS,
  };
};
export const setProducts = payload => {
  return {
    type: SET_PRODUCTS,
    payload
  }
}
