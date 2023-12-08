// adapted from https://github.com/dairyisscary/redux-undo-immutable/
import { List, Record } from "immutable";
import * as types from "../constants/ActionTypes";

export const StateHistory = Record({
  past: List(),
  present: undefined,
  future: List(),
});

function undo(history) {
  const { past, present, future } = history;
  return past.size ?
    StateHistory({
      past: past.slice(0, past.size - 1),
      present: past.last(),
      future: future.unshift(present),
    }) :
    history;
}

function redo(history) {
  const { past, present, future } = history;
  return future.size ?
    StateHistory({
      past: past.push(present),
      present: future.first(),
      future: future.slice(1),
    }) :
    history;
}

function clearHistory(history) {
  return StateHistory({ present: history.present });
}

function undoable(reducer, { actionFilter, clearHistoryType }) {
  return (history = undefined, action) => {
    if (history === undefined) {
      return StateHistory({ present: reducer(undefined, action) });
    }

    switch (action.type) {
      case types.UNDO:
        return undo(history);

      case types.REDO:
        return redo(history);

      case clearHistoryType:
        return clearHistory(history);

      default:
        const { past, present } = history;
        const newPresent = reducer(present, action);

        if (present === newPresent) {
          return history;
        } else if (!actionFilter(action)) {
          return history.merge({ present: newPresent });
        }

        const newPast = past.push(present);
        return StateHistory({
          past: newPast,
          present: newPresent,
          future: List(),
        })
    }
  }
}

export default undoable;
