import { combineReducers } from "redux";
import main from "./main";
import items from "./items";
import editor from "./editor";

export default combineReducers({
  main,
  items,
  editor,
});
