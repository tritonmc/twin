import { combineReducers } from "redux";
import editor from "./editor";
import items from "./items";
import main from "./main";

export default combineReducers({
  main,
  items,
  editor,
});
