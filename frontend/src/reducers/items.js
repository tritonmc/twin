import * as types from "../constants/ActionTypes";
import { List } from "immutable";
import undoable from "redux-undo-immutable";

function itemReducer(state = List(), action) {
  switch (action.type) {
    case types.SET_ITEMS:
      return action.data;
    case types.UPDATE_FIELD:
      return state.update(state.findKey((v) => v.getIn(["_twin", "id"]) === action.id), (item) => {
        if (item.getIn(action.path) !== action.value)
          return item.setIn(action.path, action.value).setIn(["_twin", "dateUpdated"], Date.now());
        return item;
      });
    case types.UPDATE_SIGN_LINE:
      return state.update(state.findKey((v) => v.getIn(["_twin", "id"]) === action.id), (item) => {
        if (item.getIn(["lines", action.language, action.line]) !== action.value)
          return item
            .updateIn(["lines", action.language], List(), (list) =>
              list.set(action.line, action.value)
            )
            .setIn(["_twin", "dateUpdated"], Date.now());
        return item;
      });
    case types.DELETE_ITEM:
      return state.delete(state.findKey((v) => v.getIn(["_twin", "id"]) === action.id));
    default:
      return state;
  }
}

export default undoable(itemReducer);
