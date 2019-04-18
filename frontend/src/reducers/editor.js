import { List, Map, Set } from "immutable";
import * as types from "../constants/ActionTypes";

function mainReducer(state = Map({ search: "", editorOpen: false, tags: Set() }), action) {
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
    case types.SET_ITEMS:
      return state.set(
        "tags",
        action.data.reduce((set, v) => set.union(v.getIn(["_twin", "tags"], List())), Set())
      );
    case types.ADD_TAG:
      return state.update("tags", (tags) => tags.add(action.tag));
    case types.ADD_ITEM:
      return state.set("activeItem", action.id).set("editorOpen", true);
    default:
      return state;
  }
}

export default mainReducer;
