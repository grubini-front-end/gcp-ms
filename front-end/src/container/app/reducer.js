import { combineReducers } from "redux";

import AppReducer from "@container/app/store/reducer";
import ProductsReducer from "@component/products/store/reducer";
import CartReducer from "@component/cart/store/reducer";

export const rootReducer = combineReducers({
  app: AppReducer,
  catalog: ProductsReducer,
  user: CartReducer,
});

export default rootReducer;
