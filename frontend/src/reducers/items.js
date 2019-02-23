import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function itemReducer(state = Map(), action) {
  switch (action.type) {
    case types.SET_DATA:
      return state
        .set("data", action.data)
        .set("tritonVersion", action.tritonVersion)
        .set("bungee", action.bungee)
        .set("availableLanguages", action.availableLanguages);
    default:
      return state;
  }
}

export default itemReducer;
