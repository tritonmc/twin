import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalSettings } from "hooks/useGlobalSettings";
import Lightbulb from "mdi-material-ui/Lightbulb";
import LightbulbOn from "mdi-material-ui/LightbulbOn";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
}));

const TopAppBar = () => {
  const classes = useStyles();
  const { theme, setTheme } = useGlobalSettings();

  const toggleTheme = () => setTheme(theme === 1 ? 0 : 1);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            TWIN
          </Typography>
          <div className={classes.grow} />
          <IconButton onClick={toggleTheme} color="inherit">
            {parseInt(theme) === 1 ? <Lightbulb /> : <LightbulbOn />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopAppBar;
