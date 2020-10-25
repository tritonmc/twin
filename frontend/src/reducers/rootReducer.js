import { combineReducers } from "redux";
import editor from "./editor";
import items from "./items";

export default combineReducers({
  items,
  editor,
});
