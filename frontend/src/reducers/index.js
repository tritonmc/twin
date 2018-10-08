import { combineReducers } from "redux";
import items from "./items";
import { snackbarReducer } from "react-redux-snackbar";

export default combineReducers({
  items,
  snackbar: snackbarReducer,
});
