import React, { Component } from "react";
import styles from "./App.scss";
import Home from "../Home/Home";
//import Dashboard from "./components/dashboard.js";
//import Saved from "./components/saved";
//import Migrate from "./components/migrate";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { ThemeProvider } from "@rmwc/theme";
import "@material/theme/dist/mdc.theme.css";
import TopAppBar from "./TopAppBar/TopAppBar";
import Editor from "../Editor/Editor";

class App extends Component {
  render() {
    return (
      <ThemeProvider options={THEMES[this.props.theme]}>
        <Router>
          <div className={styles.body}>
            <TopAppBar />
            <Switch>
              <Route path="/:id" component={Editor} />
              <Route component={Home} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}
/*<Route path="/migrate" component={Migrate} />
<Route path="/saved" component={Saved} />
<Route path="/error/:id" component={Home} />
<Route path="/:id" component={Dashboard} />*/

const TEXT_DEFAULTS = {
  "--mdc-theme-on-primary": "#fff",
  "--mdc-theme-on-secondary": "#fff",
  "--mdc-theme-on-surface": "#000",
  "--mdc-theme-on-error": "#fff",
  "--mdc-theme-text-primary-on-background": "rgba(0, 0, 0, 0.87)",
  "--mdc-theme-text-secondary-on-background": "rgba(0, 0, 0, 0.54)",
  "--mdc-theme-text-hint-on-background": "rgba(0, 0, 0, 0.38)",
  "--mdc-theme-text-disabled-on-background": "rgba(0, 0, 0, 0.38)",
  "--mdc-theme-text-icon-on-background": "rgba(0, 0, 0, 0.38)",
  "--mdc-theme-text-primary-on-light": "rgba(0, 0, 0, 0.87)",
  "--mdc-theme-text-secondary-on-light": "rgba(0, 0, 0, 0.54)",
  "--mdc-theme-text-hint-on-light": "rgba(0, 0, 0, 0.38)",
  "--mdc-theme-text-disabled-on-light": "rgba(0, 0, 0, 0.38)",
  "--mdc-theme-text-icon-on-light": "rgba(0, 0, 0, 0.38)",
  "--mdc-theme-text-primary-on-dark": "white",
  "--mdc-theme-text-secondary-on-dark": "rgba(255, 255, 255, 0.7)",
  "--mdc-theme-text-hint-on-dark": "rgba(255, 255, 255, 0.5)",
  "--mdc-theme-text-disabled-on-dark": "rgba(255, 255, 255, 0.5)",
  "--mdc-theme-text-icon-on-dark": "rgba(255, 255, 255, 0.5)",
};

const THEMES = [
  {
    name: "Light",
    "--mdc-theme-primary": "#008ff8",
    "--mdc-theme-secondary": "#173753",
    ...TEXT_DEFAULTS,
  },
  {
    name: "Dark",
    "--mdc-theme-primary": "#00bafa",
    "--mdc-theme-secondary": "#ff0056",
    "--mdc-theme-background": "#151836",
    "--mdc-theme-surface": "#14223f",
    "--mdc-theme-on-surface": "rgba(255,255,255,.87)",
    "--mdc-theme-on-primary": "rgba(255,255,255,.87)",
    "--mdc-theme-on-secondary": "rgba(255,255,255,.87)",
  },
  {
    name: "Dark",
    "--mdc-theme-primary": "#1D70A2",
    "--mdc-theme-secondary": "#207CA0",
    "--mdc-theme-background": "#001221",
    "--mdc-theme-surface": "#032F38",
    "--mdc-theme-on-surface": "rgba(255,255,255,.87)",
    "--mdc-theme-on-primary": "rgba(255,255,255,.87)",
    "--mdc-theme-on-secondary": "rgba(255,255,255,.87)",
  },
];

const mapStateToProps = (state, ownProps) => ({
  theme: state.main.get("theme", ownProps.cookies.get("theme")) || 0,
  loading: state.main.get("loading", false),
});

export default withCookies(connect(mapStateToProps)(App));
