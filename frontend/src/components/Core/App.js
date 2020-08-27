import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Editor from "components/Editor/Editor";
import Home from "components/Home/Home";
import Migration from "components/Migration/Migration";
import Saved from "components/Saved/Saved";
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

const mapStateToProps = (state) => ({
  theme: state.main.get("theme", parseInt(localStorage.getItem("theme")) || 0),
  loading: state.main.get("loading", false),
});

export default connect(mapStateToProps)(App);
