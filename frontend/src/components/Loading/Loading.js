import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    display: "flex",
    height: "calc(100vh - 64px)",
    alignItems: "center",
  },
  progress: {
    margin: "auto",
  },
};

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.progress}>
          <CircularProgress size={100} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
