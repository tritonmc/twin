import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setSaved } from "../../actions/main";
import SavedDialog from "./SavedDialog";

const styles = {
  root: {
    display: "flex",
    height: "calc(100vh - 64px)",
    alignItems: "center",
  },
};

class Saved extends Component {
  componentDidMount() {
    this.props.setSaved();
  }
  render() {
    const { classes } = this.props;
    const configId = (this.props.location.state && this.props.location.state.id) || undefined;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <SavedDialog configId={configId} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSaved,
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Saved)
);
