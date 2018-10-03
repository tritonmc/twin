import * as types from "../constants/ActionTypes";
import { List, Map } from "immutable";
import { combineReducers } from "redux";

function itemListRoot(state = Map(), action) {
  switch (action.type) {
    case types.SET_DATA:
      return state.merge({
        data: action.data,
        defaultData: action.data,
        tritonVersion: action.tritonVersion,
        availableLanguages: action.availableLanguages,
      });
    case types.CHANGE_ITEM_FIELD:
      if (
        action.fieldName === "key" &&
        state.get("data").findIndex((item) => {
          return item.get("key") === action.value;
        }) !== -1
      )
        return state;
      var index = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (index !== -1) return state.setIn(["data", index, action.fieldName], action.value);
      return state;
    case types.ADD_ITEM_TAG:
      var indexTag = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexTag === -1) return state;
      if (
        state.getIn(["data", indexTag, "tags"]).findIndex((item) => {
          return item === action.tag;
        }) !== -1
      )
        return state;
      return state.updateIn(["data", indexTag, "tags"], (tags) => tags.push(action.tag));
    case types.REMOVE_ITEM_TAG:
      var indexTag = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexTag === -1) return state;
      var tagIndex = state.getIn(["data", indexTag, "tags"]).findIndex((item) => {
        return item === action.tag;
      });
      if (tagIndex === -1) return state;
      return state.updateIn(["data", indexTag, "tags"], (tags) => tags.delete(tagIndex));

    default:
      return state;
  }
}

export default combineReducers({
  itemListRoot,
});
