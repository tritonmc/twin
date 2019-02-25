import * as types from "../constants/ActionTypes";
import { List } from "immutable";
import undoable from "redux-undo-immutable";

function itemReducer(state = List(), action) {
  switch (action.type) {
    case types.SET_ITEMS:
      return action.data;
    default:
      return state;
  }
}

export default undoable(itemReducer);
