import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
  },
  progress: {
    margin: "auto",
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.progress}>
        <CircularProgress size={100} />
      </div>
    </div>
  );
};

export default Loading;
