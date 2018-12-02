import { combineReducers } from "redux";
import items from "./items";
import main from "./main";
import navigation from "./navigation";
import { snackbarReducer } from "react-redux-snackbar";

export default combineReducers({
  items,
  snackbar: snackbarReducer,
  main,
  navigation,
});
