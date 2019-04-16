import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo-immutable";

class UndoRedoButtons extends Component {
  render() {
    const { onUndo, onRedo, canUndo, canRedo } = this.props;
    return (
      <>
        <Tooltip title="Undo">
          <IconButton onClick={onUndo} disabled={!canUndo}>
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton onClick={onRedo} disabled={!canRedo}>
            <RedoIcon />
          </IconButton>
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
