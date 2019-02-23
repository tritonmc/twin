import { combineReducers } from "redux";
import main from "./main";
import items from "./items";

export default combineReducers({
  main,
  items,
});
