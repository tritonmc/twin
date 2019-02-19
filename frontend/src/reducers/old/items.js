import * as types from "../constants/ActionTypes";
import Immutable, { List, Map } from "immutable";
import undoable from "redux-undo-immutable";
import uuid from "uuid/v4";

function itemListRoot(state = Map(), action) {
  switch (action.type) {
    case types.SET_ACTIVE_ITEM:
      return state.set("activeItem", action.item);
    case types.ADD_ITEM:
      return state
        .set("activeItem", 0)
        .update("data", (data) => itemListDataUndoable(data, action));
    case types.SET_DATA:
      state = state.merge({
        defaultData: action.data,
        tritonVersion: action.tritonVersion,
        bungee: action.bungee,
        availableLanguages: action.availableLanguages,
        previewLanguage: action.availableLanguages[0],
        activeItem: undefined,
      });
    // falls through
    default:
      return state.update("data", (data) => itemListDataUndoable(data, action));
  }
}

function itemListData(state = List(), action) {
  switch (action.type) {
    case types.SET_DATA:
      return Immutable.fromJS(action.data);
    // falls through
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
    case types.TOGGLE_EXPAND:
      let index = action.id;
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
          item = { key: "", type: "text", uuid: uuid() };
          break;
        case "sign":
          item = { key: "", type: "sign", uuid: uuid() };
          break;
        default:
          item = {};
      }
      return state.insert(0, Map(item));
    case types.DELETE_ITEM:
      return state.remove(action.id);
    default:
      return state;
  }
}

var itemListDataUndoable = undoable(itemListData, {
  actionFilter: (action) => action.type !== types.TOGGLE_EXPAND && action.type !== types.SET_DATA,
});

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
      return state.update("locations", List(), (locations) =>
        locations.push(action.location.merge({ uuid: uuid() }))
      );
    case types.CHANGE_SIGN_LINE:
      return state.updateIn(["lines", action.lang], List(), (list) =>
        list.set(action.index, action.value)
      );
    case types.TOGGLE_EXPAND:
      return state.update("expanded", false, (expanded) => !expanded);
    default:
      return state;
  }
}

export default itemListRoot;
