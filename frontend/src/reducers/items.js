import { List, Map } from "immutable";
import undoable from "redux-undo-immutable";
import uuid from "uuid/v4";
import * as types from "../constants/ActionTypes";

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
    case types.UPDATE_SIGN_COORDINATE:
      return state.update(
        state.findKey((v) => v.getIn(["_twin", "id"]) === action.itemId),
        (item) => {
          var locIndex = item.get("locations").findKey((v) => v.get("id") === action.locId);
          if (item.getIn(["locations", locIndex, action.field]) !== action.value)
            return item
              .setIn(["locations", locIndex, action.field], action.value)
              .setIn(["_twin", "dateUpdated"], Date.now());
          return item;
        }
      );
    case types.DELETE_SIGN_LOCATION:
      return state.update(
        state.findKey((v) => v.getIn(["_twin", "id"]) === action.itemId),
        (item) => {
          return item
            .update("locations", (locs) => {
              return locs.delete(locs.findKey((v) => v.get("id") === action.locId));
            })
            .setIn(["_twin", "dateUpdated"], Date.now());
        }
      );
    case types.ADD_SIGN_LOCATION:
      return state.update(state.findKey((v) => v.getIn(["_twin", "id"]) === action.id), (item) => {
        return item
          .update("locations", List(), (locs) => {
            return locs.push(Map({ id: uuid() }));
          })
          .setIn(["_twin", "dateUpdated"], Date.now());
      });
    default:
      return state;
  }
}

export default undoable(itemReducer, {
  actionFilter: (action) => action.type !== types.SET_ITEMS,
});
