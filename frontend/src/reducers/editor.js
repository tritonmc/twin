import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function mainReducer(state = Map(), action) {
  switch (action.type) {
    case types.SET_PREVIEW_LANGUAGE:
      return state.set("previewLanguage", action.language);
    case types.SET_DATA:
      return state.set("previewLanguage", action.availableLanguages[0] || "");
    default:
      return state;
  }
}

export default mainReducer;
