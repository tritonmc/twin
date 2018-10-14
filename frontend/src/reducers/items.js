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
        bungee: action.bungee,
        availableLanguages: action.availableLanguages,
      });
    case types.CHANGE_ITEM_FIELD:
    case types.ADD_ITEM_TAG:
    case types.REMOVE_ITEM_TAG:
    case types.ADD_ITEM_SERVER:
    case types.REMOVE_ITEM_SERVER:
    case types.CHANGE_ITEM_TEXT:
    case types.CHANGE_SIGN_COORDINATE:
    case types.REMOVE_SIGN_COORDINATE:
    case types.ADD_SIGN_COORDINATE:
    case types.CHANGE_SIGN_LINE:
    case types.ADD_ITEM:
      return state.update("data", (data) => itemListData(data, action));
    default:
      return state;
  }
}

function itemListData(state = List(), action) {
  switch (action.type) {
    case types.CHANGE_ITEM_FIELD:
      if (
        action.fieldName === "key" &&
        state.findIndex((item) => {
          return item.get("key") === action.value;
        }) !== -1
      )
        return state;
    // falls through
    case types.ADD_ITEM_TAG:
    case types.REMOVE_ITEM_TAG:
    case types.ADD_ITEM_SERVER:
    case types.REMOVE_ITEM_SERVER:
    case types.CHANGE_ITEM_TEXT:
    case types.CHANGE_SIGN_COORDINATE:
    case types.REMOVE_SIGN_COORDINATE:
    case types.ADD_SIGN_COORDINATE:
    case types.CHANGE_SIGN_LINE:
      let index = state.findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (index === -1) return state;
      return state.update(index, (item) => itemListItem(item, action));
    case types.ADD_ITEM:
      if (
        state.findIndex((item) => {
          return item.get("key") === "";
        }) !== -1
      )
        return state;
      let item;
      switch (action.itemType) {
        case "text":
          item = { key: "", type: "text" };
          break;
        case "sign":
          item = { key: "", type: "sign" };
          break;
        default:
          item = {};
      }
      return state.push(Map(item));
    default:
      return state;
  }
}

function itemListItem(state = Map(), action) {
  switch (action.type) {
    case types.CHANGE_ITEM_FIELD:
      return state.set(action.fieldName, action.value);
    case types.ADD_ITEM_TAG:
      if (
        state.get("tags", List()).findIndex((item) => {
          return item === action.tag;
        }) !== -1
      )
        return state;
      return state.update("tags", List(), (tags) => tags.push(action.tag));
    case types.REMOVE_ITEM_TAG:
      var tagIndex = state.get("tags").findIndex((item) => {
        return item === action.tag;
      });
      if (tagIndex === -1) return state;
      return state.update("tags", (tags) => tags.delete(tagIndex));
    case types.ADD_ITEM_SERVER:
      if (
        state.get("servers", List()).findIndex((item) => {
          return item === action.server;
        }) !== -1
      )
        return state;
      return state.update("servers", List(), (servers) => servers.push(action.server));
    case types.REMOVE_ITEM_SERVER:
      var serverIndex = state.get("servers").findIndex((item) => {
        return item === action.server;
      });
      if (serverIndex === -1) return state;
      return state.update("servers", (servers) => servers.delete(serverIndex));
    case types.CHANGE_ITEM_TEXT:
      return state.setIn(["languages", action.language], action.text);
    case types.CHANGE_SIGN_COORDINATE:
      return state.setIn(["locations", action.coordinateId, action.field], action.value);
    case types.REMOVE_SIGN_COORDINATE:
      return state.update("locations", (locations) => locations.delete(action.coordinateId));
    case types.ADD_SIGN_COORDINATE:
      return state.update("locations", List(), (locations) => locations.push(action.location));
    case types.CHANGE_SIGN_LINE:
      return state.setIn(["lines", action.lang, action.index], action.value);
    default:
      return state;
  }
}

export default combineReducers({
  itemListRoot,
});
