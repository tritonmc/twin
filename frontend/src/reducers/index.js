import { combineReducers } from "redux";
import items from "./items";
import main from "./main";
import pagination from "./pagination";
import { snackbarReducer } from "react-redux-snackbar";

export default combineReducers({
  items,
  snackbar: snackbarReducer,
  main,
  pagination,
});
