import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo-immutable";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class UndoRedoButtons extends Component {
  render() {
    const { onUndo, onRedo, canUndo, canRedo, list } = this.props;
    if (list)
      return (
        <>
          <MenuItem onClick={onUndo} disabled={!canUndo}>
            <ListItemIcon>
              <UndoIcon />
            </ListItemIcon>
            <ListItemText primary="Undo" />
          </MenuItem>
          <MenuItem onClick={onRedo} disabled={!canRedo}>
            <ListItemIcon>
              <RedoIcon />
            </ListItemIcon>
            <ListItemText primary="Redo" />
          </MenuItem>
        </>
      );
    return (
      <>
        <Tooltip title="Undo">
          <span>
            <IconButton color="inherit" onClick={onUndo} disabled={!canUndo}>
              <UndoIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo">
          <span>
            <IconButton color="inherit" onClick={onRedo} disabled={!canRedo}>
              <RedoIcon />
            </IconButton>
          </span>
        </Tooltip>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    canUndo: state.items.get("past").size > 0,
    canRedo: state.items.get("future").size > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedoButtons);
