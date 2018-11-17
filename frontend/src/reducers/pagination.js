import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function mainReducer(state = Map({ page: 1, perpage: 10 }), action) {
  switch (action.type) {
    case types.SET_PAGE:
      return state.set("page", action.page);
    case types.NEXT_PAGE:
      return state.update("page", (page) => page++);
    case types.PREVIOUS_PAGE:
      return state.update("page", (page) => (page === 1 ? 1 : page--));
    default:
      return state;
  }
}

export default mainReducer;
