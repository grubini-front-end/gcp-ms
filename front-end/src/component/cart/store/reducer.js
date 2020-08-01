import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_QUANTITY,
  SUBSTRACT_QUANTITY,
  SET_QUANTITY,
  COMPLETE_CHECKOUT,
  SET_HISTORY
} from "./action";

const INITIAL_STATE = {
  cart: {},
  history: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        cart: {
          ...state.cart,
          [payload.id]: { ...payload },
        },
      };
    }
    case REMOVE_PRODUCT: {
      const prevCart = { ...state.cart };
      delete prevCart[payload];
      return {
        ...state,
        cart: { ...prevCart },
      };
    }
    case ADD_QUANTITY: {
      const cart = { ...state.cart };
      const product = { ...cart[payload.id] };
      const updatedProduct = {
        ...product,
        qty: payload.quantity,
      };

      const updatedCart = { ...cart, [payload.id]: updatedProduct };
      return {
        ...state,
        cart: {
          ...updatedCart,
        },
      };
    }
    case SUBSTRACT_QUANTITY: {
      const cart = { ...state.cart };
      const product = { ...cart[payload] };
      const newQty = +product.qty - 1 < 1 ? 1 : +product.qty - 1;
      const updatedProduct = { ...product, qty: newQty };
      const updatedCart = { ...cart, [payload]: updatedProduct };
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case SET_QUANTITY: {
      if (payload.qty > 0) {
        const cart = { ...state.cart };
        const product = { ...cart[payload.id] };
        const updatedProduct = { ...product, qty: +payload.qty };
        const updatedCart = { ...cart, [payload.id]: updatedProduct };
        return {
          ...state,
          cart: updatedCart,
        };
      }
      return state;
    }
    case COMPLETE_CHECKOUT: {
      return {
        ...state,
        cart: {},
      };
    }
    case SET_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          ...payload,
        },
      };
    }
    default:
      return state;
  }
};
