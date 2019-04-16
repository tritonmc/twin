import { SnackbarProvider } from "notistack";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/Core/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={configureStore()}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
