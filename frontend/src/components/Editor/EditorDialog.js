import React, { Component } from "react";
import { closeEditor } from "../../actions/editor";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import KeyField from "./EditorFields/KeyField";
import DeleteButton from "./EditorFields/DeleteButton";

const styles = (theme) => ({
  appBar: {
    position: "relative",
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 1200,
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditorDialog extends Component {
  render() {
    const { classes, id, open, close } = this.props;
    return (
      <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={close}
              aria-label="Close"
              className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Editing Language Item
            </Typography>
            <DeleteButton item={id} />
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
          <KeyField id={id} />
          <Typography variant="h6">Text</Typography>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.editor.get("editorOpen", false),
    id: state.editor.get("activeItem"),
  };
};

const mapDispatchToProps = {
  close: closeEditor,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorDialog)
);
