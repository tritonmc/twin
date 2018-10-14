import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function mainReducer(state = Map({ loading: true }), action) {
  switch (action.type) {
    case types.SET_LOADING:
      return state.set("loading", action.loading);
    default:
      return state;
  }
}

export default mainReducer;
