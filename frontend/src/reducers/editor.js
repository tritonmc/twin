import { fromJS, List, Map, Set } from "immutable";
import * as types from "../constants/ActionTypes";

function mainReducer(
  state = Map({
    tags: Set(),
    sort: Map({ field: "_twin.dateUpdated", asc: false }),
    selected: List(),
    metadata: Map(),
  }),
  action
) {
  switch (action.type) {
    case types.SET_METADATA:
      return state.set("metadata", fromJS(action.metadata));
    case types.ADD_COLLECTION:
      return state.update("metadata", (metadata) =>
        metadata.set(action.name, fromJS(action.options))
      );
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
      return state.update("metadata", (metadata) => {
        if (metadata.has(action.collection)) return metadata;
        return metadata.set(action.collection, Map());
      });
    case types.CLEAR_DATA:
      return state.remove("tags").remove("defaultData").remove("metadata");
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
    case types.DELETE_COLLECTION:
      return state.update("metadata", (v) => v.delete(action.name));
    default:
      return state;
  }
}

export default mainReducer;
