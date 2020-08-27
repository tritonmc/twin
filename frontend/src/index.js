import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./components/Core/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

ReactDOM.render(
  <Provider store={configureStore()}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
