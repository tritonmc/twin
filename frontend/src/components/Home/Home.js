import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import InputDialog from "./InputDialog";

const styles = {
  root: {
    display: "flex",
    height: "calc(100vh - 64px)",
    alignItems: "center",
  },
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <InputDialog />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
