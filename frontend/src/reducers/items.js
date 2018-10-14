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
      if (!state.hasIn(["data", indexTag, "tags"]))
        state = state.setIn(["data", indexTag, "tags"], new List());
      if (
        state.getIn(["data", indexTag, "tags"]).findIndex((item) => {
          return item === action.tag;
        }) !== -1
      )
        return state;
      return state.updateIn(["data", indexTag, "tags"], (tags) => tags.push(action.tag));
    case types.REMOVE_ITEM_TAG:
      var indexTag2 = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexTag2 === -1) return state;
      var tagIndex = state.getIn(["data", indexTag2, "tags"]).findIndex((item) => {
        return item === action.tag;
      });
      if (tagIndex === -1) return state;
      return state.updateIn(["data", indexTag2, "tags"], (tags) => tags.delete(tagIndex));
    case types.ADD_ITEM_SERVER:
      var indexServer = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexServer === -1) return state;
      if (!state.hasIn(["data", indexServer, "servers"]))
        state = state.setIn(["data", indexServer, "servers"], new List());
      if (
        state.getIn(["data", indexServer, "servers"]).findIndex((item) => {
          return item === action.server;
        }) !== -1
      )
        return state;
      return state.updateIn(["data", indexServer, "servers"], (servers) =>
        servers.push(action.server)
      );
    case types.REMOVE_ITEM_SERVER:
      var indexServer2 = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexServer2 === -1) return state;
      var serverIndex = state.getIn(["data", indexServer2, "servers"]).findIndex((item) => {
        return item === action.server;
      });
      if (serverIndex === -1) return state;
      return state.updateIn(["data", indexServer2, "servers"], (servers) =>
        servers.delete(serverIndex)
      );
    case types.CHANGE_ITEM_TEXT:
      var indexText = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexText === -1) return state;
      return state.setIn(["data", indexText, "languages", action.language], action.text);
    case types.CHANGE_SIGN_COORDINATE:
      var indexSignCoordinate = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexSignCoordinate === -1) return state;
      return state.setIn(
        ["data", indexSignCoordinate, "locations", action.coordinateId, action.field],
        action.value
      );
    case types.REMOVE_SIGN_COORDINATE:
      var indexSignCoordinate2 = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexSignCoordinate2 === -1) return state;
      return state.updateIn(["data", indexSignCoordinate2, "locations"], (locations) =>
        locations.delete(action.coordinateId)
      );
    case types.ADD_SIGN_COORDINATE:
      var indexSignCoordinate3 = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexSignCoordinate3 === -1) return state;
      return state.updateIn(["data", indexSignCoordinate3, "locations"], (locations) =>
        locations.push(action.location)
      );
    case types.CHANGE_SIGN_LINE:
      var indexSignCoordinate4 = state.get("data").findIndex((item) => {
        return item.get("key") === action.id;
      });
      if (indexSignCoordinate4 === -1) return state;
      return state.setIn(
        ["data", indexSignCoordinate4, "lines", action.lang, action.index],
        action.value
      );
    default:
      return state;
  }
}

export default combineReducers({
  itemListRoot,
});
