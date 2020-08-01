import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/index.css";
import App from "@container/app";
import reducers from "@container/app/reducer";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
