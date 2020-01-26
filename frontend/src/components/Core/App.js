import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
//import Migrate from "./components/migrate";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Editor from "../Editor/Editor";
import Home from "../Home/Home";
import Migration from "../Migration/Migration";
//import Dashboard from "./components/dashboard.js";
import Saved from "../Saved/Saved";
import TopAppBar from "./TopAppBar";

const THEMES = [
  createMuiTheme({
    palette: {
      primary: { main: "#008ff8" },
      secondary: { main: "#173753" },
    },
    typography: {
      useNextVariants: true,
      fontFamily: ['"Lato"', "sans-serif"].join(","),
    },
  }),
  createMuiTheme({
    palette: {
      type: "dark",
      primary: { main: "#00bafa" },
      secondary: { main: "#ff0056" },
      background: { paper: "#14223f", default: "#151836" },
    },
    typography: {
      useNextVariants: true,
      fontFamily: ['"Lato"', "sans-serif"].join(","),
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: "#14223f",
          color: "#fff",
        },
      },
    },
  }),
];

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={THEMES[this.props.theme]}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}>
          <Router>
            <>
              <TopAppBar currentTheme={this.props.theme} />
              <Switch>
                <Route path="/saved" component={Saved} />
                <Route path="/migrate" component={Migration} />
                <Route path="/:id" component={Editor} />
                <Route component={Home} />
              </Switch>
            </>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}
/*
<Switch>
  <Route path="/:id" component={Editor} />
  <Route component={Home} />
</Switch>
*/
/*<Route path="/migrate" component={Migrate} />
<Route path="/saved" component={Saved} />
<Route path="/error/:id" component={Home} />
<Route path="/:id" component={Dashboard} />*/

/*const THEMES2 = [
  {
    name: "Light",
    "--mdc-theme-primary": "#008ff8",
    "--mdc-theme-secondary": "#173753",
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
];*/

const mapStateToProps = (state, ownProps) => ({
  theme: state.main.get("theme", ownProps.cookies.get("theme")) || 0,
  loading: state.main.get("loading", false),
});

export default withCookies(connect(mapStateToProps)(App));
