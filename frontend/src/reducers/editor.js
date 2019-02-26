import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

function mainReducer(state = Map({ search: "", editorOpen: false }), action) {
  switch (action.type) {
    case types.SET_PREVIEW_LANGUAGE:
      return state.set("previewLanguage", action.language);
    case types.SET_DATA:
      return state.set("previewLanguage", action.availableLanguages[0] || "");
    case types.SET_SEARCH:
      return state.set("search", action.search);
    case types.OPEN_EDITOR:
      return state.set("activeItem", action.item).set("editorOpen", true);
    case types.CLOSE_EDITOR:
      return state.set("editorOpen", false);
    default:
      return state;
  }
}

export default mainReducer;
