export const SELECT_PRODUCT = "SELECT_PRODUCT";
export const SIGN_IN = "SIGN_IN";
export const SET_SIGN_IN = "SET_SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";



export const selectProduct = payload => ({
  type: SELECT_PRODUCT,
  payload,
});
export const setSignIn = payload => ({
  type: SET_SIGN_IN,
  payload,
});
export const signOut = () => ({
  type: SIGN_OUT,
});
export const setError = payload => ({
  type: SET_ERROR,
  payload,
});
export const clearError = () => ({
  type: CLEAR_ERROR,
});
