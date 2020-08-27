import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Editor from "components/Editor/Editor";
import Home from "components/Home/Home";
import Migration from "components/Migration/Migration";
import Saved from "components/Saved/Saved";
import { useGlobalSettings } from "hooks/useGlobalSettings";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ThemeColor from "./ThemeColor";

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

const App = () => {
  const { theme } = useGlobalSettings();
  return (
    <MuiThemeProvider theme={THEMES[theme]}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}>
        <ThemeColor />
        <Router>
          <Switch>
            <Route path="/saved" component={Saved} />
            <Route path="/migrate" component={Migration} />
            <Route path="/:id" component={Editor} />
            <Route component={Home} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default App;
