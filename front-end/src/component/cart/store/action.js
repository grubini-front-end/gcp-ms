export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const SUBSTRACT_QUANTITY = "SUBSTRACT_QUANTITY";
export const SET_QUANTITY = "SET_QUANTITY";
export const SET_HISTORY = "SET_HISTORY";
export const COMPLETE_CHECKOUT = "COMPLETE_CHECKOUT";

export const addProductToCart = payload => {
  return {
    type: ADD_PRODUCT,
    payload,
  };
};
export const getOrders = payload => {
  return {
    type: SET_HISTORY,
    payload,
  };
};
export const removeProduct = payload => {
  return {
    type: REMOVE_PRODUCT,
    payload,
  };
};
export const addOneToProduct = (id, quantity) => {
  return (dispatch, getState) => {
    const products = { ...getState().catalog.products };
    const cart = { ...getState().user.cart };
    const haveItems = Object.entries(cart[id] || {}).length === 0;
    if (!haveItems) {
      dispatch({
        type: ADD_QUANTITY,
        payload: {
          id,
          quantity: quantity || 1,
        },
      });
    } else {
      const newProduct = products[id];
      dispatch({
        type: ADD_PRODUCT,
        payload: {
          id,
          name: newProduct.name,
          picture: newProduct.picture,
          description: newProduct.description,
          qty: 1,
          cost: newProduct.cost,
        },
      });
    }
  };
};

export const substractOneFromProduct = payload => {
  return {
    type: SUBSTRACT_QUANTITY,
    payload,
  };
};
export const setQuantityManually = payload => {
  return {
    type: SET_QUANTITY,
    payload,
  };
};
export const completeCheckout = () => {
  return {
    type: COMPLETE_CHECKOUT,
  };
};
