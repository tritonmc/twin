import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function navigationReducer(state = Map({ search: "" }), action) {
  switch (action.type) {
    case types.SET_SEARCH:
      return state.set("search", action.search);
    default:
      return state;
  }
}

export default navigationReducer;
