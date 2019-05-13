import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
// calling for redux-form specific reducer and hooking it to our state
import { reducer as formReducer } from "redux-form";
import streamReducer from "./StreamReducer";

// combining reducers in order to generate the final store
export default combineReducers({
  auth: AuthReducer,
  // it is necessary to map the reducer against the key called 'from', redux-form only knows 'form'
  form: formReducer,
  streams: streamReducer
});
