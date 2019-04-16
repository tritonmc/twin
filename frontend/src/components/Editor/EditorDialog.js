import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Map } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";
import { closeEditor } from "../../actions/editor";
import BungeeSection from "./EditorFields/BungeeSection";
import DeleteButton from "./EditorFields/DeleteButton";
import KeyField from "./EditorFields/KeyField";
import LocationSection from "./EditorFields/LocationSection";
import MetaSection from "./EditorFields/MetaSection";
import TextFieldsSection from "./EditorFields/TextFieldsSection";

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
    padding: "0 15px",
  },
  sectionHeader: {
    width: "100%",
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
          <Typography variant="h5" className={classes.sectionHeader}>
            Text
          </Typography>
          <TextFieldsSection id={id} />
          {this.props.type === "text" && this.props.bungee && (
            <>
              <Typography variant="h5" className={classes.sectionHeader}>
                BungeeCord
              </Typography>
              <BungeeSection id={id} />
            </>
          )}
          {this.props.type === "sign" && (
            <>
              <Typography variant="h5" className={classes.sectionHeader}>
                Sign Locations
              </Typography>
              <LocationSection id={id} />
            </>
          )}
          <Typography variant="h5" className={classes.sectionHeader}>
            Meta
          </Typography>
          <MetaSection id={id} />
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  const id = state.editor.get("activeItem");
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === id, undefined, Map());
  return {
    open: state.editor.get("editorOpen", false),
    id,
    type: item.get("type", "text"),
    bungee: state.main.get("bungee", false),
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
