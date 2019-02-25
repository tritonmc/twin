import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

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
        .set("availableLanguages", action.availableLanguages);
    default:
      return state;
  }
}

export default mainReducer;
