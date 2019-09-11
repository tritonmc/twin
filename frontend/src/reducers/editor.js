import { List, Map, Set, fromJS } from "immutable";
import * as types from "../constants/ActionTypes";

function mainReducer(
  state = Map({
    search: "",
    editorOpen: false,
    tags: Set(),
    sort: Map({ field: "_twin.dateUpdated", asc: false }),
    selected: List(),
    metadata: Map(),
  }),
  action
) {
  switch (action.type) {
    case types.SET_PREVIEW_LANGUAGE:
      return state.set("previewLanguage", action.language);
    case types.SET_DATA:
      return state.set("previewLanguage", action.availableLanguages[0] || "");
    case types.SET_METADATA:
      return state.set("metadata", fromJS(action.metadata));
    case types.ADD_COLLECTION:
      return state.update("metadata", (metadata) =>
        metadata.set(action.name, fromJS({ universal: true, blacklist: false, servers: [] }))
      );
    case types.SET_SEARCH:
      return state.set("search", action.search);
    case types.OPEN_EDITOR:
      return state.set("activeItem", action.item).set("editorOpen", true);
    case types.CLOSE_EDITOR:
      return state.set("editorOpen", false);
    case types.SET_ITEMS:
      return state
        .set(
          "tags",
          action.data.reduce((set, v) => set.union(v.getIn(["_twin", "tags"], List())), Set())
        )
        .set("defaultData", action.data);
    case types.ADD_TAG:
      return state.update("tags", (tags) => tags.add(action.tag));
    case types.ADD_ITEM:
      return state.set("activeItem", action.id).set("editorOpen", true);
    case types.SET_SAVED:
      return state
        .remove("tags")
        .remove("search")
        .remove("activeItem")
        .remove("previewLanguage")
        .remove("defaultData")
        .remove("metadata");
    case types.SET_SORT:
      return state.setIn(["sort", "field"], action.field).setIn(["sort", "text"], action.text);
    case types.TOGGLE_SELECT:
      return state.update("selected", (selected) => {
        let index = selected.indexOf(action.id);
        if (index === -1) return selected.push(action.id);
        return selected.delete(index);
      });
    case types.SET_ALL_SELECT:
      if (action.selected === false && !action.id)
        return state.update("selected", (v) => v.clear());
      return state.update("selected", (l) => {
        l = l.filterNot((v) => action.id.indexOf(v) >= 0);
        if (action.selected) l = l.push(...action.id);
        return l;
      });
    case types.DELETE_ITEM:
      if (typeof action.id === "object") return state.update("selected", (v) => v.clear());
      return state.update("selected", (v) => {
        let index = v.indexOf(action.id);
        if (index !== -1) return v.delete(index);
        return v;
      });
    default:
      return state;
  }
}

export default mainReducer;
