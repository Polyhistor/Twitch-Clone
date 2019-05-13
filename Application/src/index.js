import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./Component/App";
import reducers from "./reducers";

// mounting our Redux-Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// generating the store
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  // wrapping our react app in react-redux provider
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
