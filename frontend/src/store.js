import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import Immutable from "immutable";

export default function configureStore() {
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          serialize: {
            immutable: Immutable,
          },
        })
      : compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
