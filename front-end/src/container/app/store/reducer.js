import {
  SET_ERROR,
  SELECT_PRODUCT,
  SIGN_OUT,
  SET_SIGN_IN,
} from "@container/app/store/action";
import { returnObject } from "@container/app/store/util";

const INITIAL_STATE = {
  productIdSelected: null,
  isLoggedIn: false,
  session: {
    token: null,
    expires_at: null,
  },
  error: {
    status: false,
    message: "",
  },
};

const setError = (state, payload) => ({
  ...state,
  error: {
    ...state.error,
    status: true,
    message: payload,
  },
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_SIGN_IN: {
      return {
        ...state,
        isLoggedIn: true,
        session: {
          ...state.session,
          token: payload.token,
          expires_at: payload.expires_at,
        },
      };
    }
    case SIGN_OUT:
      return INITIAL_STATE;
    case SELECT_PRODUCT:
      return returnObject(state, { productIdSelected: payload });
    case SET_ERROR:
      return setError(state, payload);
    default:
      return state;
  }
};
