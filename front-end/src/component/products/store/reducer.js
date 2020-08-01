import { SET_PRODUCTS } from "./action";

const INITIAL_STATE = {
  products: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    default:
      return state;
  }
};
