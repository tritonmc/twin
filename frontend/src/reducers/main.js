import { List, Map } from "immutable";
import * as types from "../constants/ActionTypes";

function mainReducer(state = Map({ loading: false, drawerState: false }), action) {
  switch (action.type) {
    case types.SET_THEME:
      return state.set("theme", action.theme);
    case types.SET_ID:
      return state.set("id", action.id);
    case types.SET_DRAWER_STATE:
      return state.set("drawerState", action.state);
    case types.SET_LOADING:
      return state.set("loading", action.loading);
    case types.SET_DATA:
      return state
        .set("tritonVersion", action.tritonVersion)
        .set("bungee", action.bungee)
        .set("availableLanguages", List(action.availableLanguages));
    case types.SET_SETTINGS_STATE:
      return state.set("settingsOpen", action.open);
    default:
      return state;
  }
}

export default mainReducer;
