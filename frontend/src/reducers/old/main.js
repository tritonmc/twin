import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function mainReducer(state = Map({ loading: true, id: "" }), action) {
  switch (action.type) {
    case types.SET_LOADING:
      return state.set("loading", action.loading);
    case types.SET_ID:
      return state.set("id", action.id);
    case types.SET_SAVED:
      return state.set("saved", action.id);
    default:
      return state;
  }
}

export default mainReducer;
