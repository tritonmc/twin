import { fromJS, is, List, Map } from "immutable";
import { v4 as uuid } from "uuid";
import undoable from "./undo";
import * as types from "../constants/ActionTypes";

function itemReducer(state = List(), action) {
  switch (action.type) {
    case types.SET_ITEMS:
      return action.data;
    case types.UPDATE_FIELD:
      return state.update(action.index, (item) => {
        if (item.getIn(action.path, null) !== action.value) {
          if (action.value === null)
            return item.removeIn(action.path).setIn(["_twin", "dateUpdated"], Date.now());
          return item.setIn(action.path, action.value).setIn(["_twin", "dateUpdated"], Date.now());
        }
        return item;
      });
    case types.UPDATE_SIGN_LINE:
      return state.update(action.index, (item) => {
        if (item.getIn(["lines", action.language, action.line]) !== action.value)
          return item
            .updateIn(["lines", action.language], List(["", "", "", ""]), (list) =>
              list.set(action.line, action.value)
            )
            .setIn(["_twin", "dateUpdated"], Date.now());
        return item;
      });
    case types.DELETE_ITEM:
      if (typeof action.id === "object")
        return state.filterNot((v) => action.id.includes(v.getIn(["_twin", "id"])));
      return state.delete(state.findKey((v) => v.getIn(["_twin", "id"]) === action.id));
    case types.UPDATE_SIGN_COORDINATE:
      return state.update(action.index, (item) => {
        const locIndex = item.get("locations").findKey((v) => v.get("id") === action.locId);
        if (item.getIn(["locations", locIndex, action.field]) !== action.value)
          return item
            .setIn(["locations", locIndex, action.field], action.value)
            .setIn(["_twin", "dateUpdated"], Date.now());
        return item;
      });
    case types.DELETE_SIGN_LOCATION:
      return state.update(action.index, (item) => {
        return item
          .update("locations", (locs) => {
            return locs.delete(locs.findKey((v) => v.get("id") === action.locId));
          })
          .setIn(["_twin", "dateUpdated"], Date.now());
      });
    case types.ADD_SIGN_LOCATION:
      return state.update(action.index, (item) => {
        return item
          .update("locations", List(), (locs) => {
            return locs.push(Map({ id: uuid() }));
          })
          .setIn(["_twin", "dateUpdated"], Date.now());
      });
    case types.TOGGLE_ARCHIVE_STATE:
      if (typeof action.id === "object")
        return state.map((v) =>
          action.id.includes(v.getIn(["_twin", "id"]))
            ? v
                .setIn(["_twin", "archived"], action.status)
                .setIn(["_twin", "dateUpdated"], Date.now())
            : v
        );
      return state.update(action.id, (item) => {
        return item
          .updateIn(["_twin", "archived"], false, (value) => !value)
          .setIn(["_twin", "dateUpdated"], Date.now());
      });
    case types.ADD_ITEM:
      return state.push(
        Map({
          fileName: action.collection,
          type: action.itemType,
          _twin: Map({
            id: action.id,
            dateUpdated: Date.now(),
            dateCreated: Date.now(),
          }),
        })
      );
    case types.ADD_PATTERN:
      return state.update(action.index, (item) => {
        return item
          .update("patterns", List(), (patterns) => {
            return patterns.push("");
          })
          .setIn(["_twin", "dateUpdated"], Date.now());
      });
    case types.DELETE_PATTERN:
      return state.update(action.index, (item) => {
        return item
          .update("patterns", List(), (patterns) => {
            return patterns.delete(action.patternIndex);
          })
          .setIn(["_twin", "dateUpdated"], Date.now());
      });
    case types.CLEAR_DATA:
      return List();
    case types.IMPORT_TRANSLATIONS:
      const indexMap = {};
      state.forEach((item, i) => (indexMap[item.getIn(["_twin", "id"])] = i));

      return Object.keys(action.translations).reduce((acc, key) => {
        const twinId = key.split(".")[0];
        const index = indexMap[twinId];

        // If translation doesn't exist
        if (index === undefined)
          return acc.push(
            fromJS({
              fileName: "default",
              type: "text",
              key: key.split(".").slice(1).join("."),
              _twin: Map({
                id: twinId,
                dateUpdated: Date.now(),
                dateCreated: Date.now(),
              }),
              languages: {
                [action.language]: action.translations[key],
              },
            })
          );

        return acc.update(index, (v) => {
          if (v.get("type") === "sign") {
            const signData = fromJS(splitSignData(action.translations[key]));
            if (is(v.getIn(["lines", action.language]), signData)) return v;
            return v
              .setIn(["lines", action.language], signData)
              .setIn(["_twin", "dateUpdated"], Date.now());
          }
          const newValue = action.translations[key] ?? undefined;
          if (v.getIn(["languages", action.language]) === newValue) return v;
          return v
            .setIn(["languages", action.language], newValue)
            .setIn(["_twin", "dateUpdated"], Date.now());
        });
      }, state);
    case types.DELETE_COLLECTION:
      return state.map((v) =>
        v.update((v) =>
          v.get("fileName", "default") === action.name ? v.set("fileName", "default") : v
        )
      );
    case types.MOVE_COLLECTION_BULK:
      return state.map((v) =>
        action.items.indexOf(v.getIn(["_twin", "id"], "")) !== -1
          ? v.update((v) =>
              v.set("fileName", action.collection).setIn(["_twin", "dateUpdated"], Date.now())
            )
          : v
      );
    case types.SCRIPT_REPLACE_BLANK_TRANSLATIONS_WITH_NULL:
      return state.map((v) =>
        v.update("languages", (langs) => (!langs ? langs : langs.filter((lang) => !!lang)))
      );
    default:
      return state;
  }
}

const splitSignData = (text) => {
  if (!text) return [];
  return fromJS(text.split("\n"));
};

export default undoable(itemReducer, {
  actionFilter: (action) =>
    action.type !== types.SET_ITEMS && action.type !== types.DELETE_COLLECTION,
  clearHistoryType: types.CLEAR_DATA,
});
