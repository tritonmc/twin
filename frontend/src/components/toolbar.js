import React from "react";
import { IconButton } from "@rmwc/icon-button";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo-immutable";
import { addItem } from "../actions/items";
import { SimpleMenu, MenuItem } from "@rmwc/menu";
import saveAll from "../actions/saving";

class Toolbar extends React.PureComponent {
  render() {
    return (
      <div id="toolbar">
        <span className="brand-name hide-on-small">
          Triton Web Interface
          <span className="subbrand-name">BETA</span>
        </span>
        <span className="brand-name show-on-small-only">
          TWIN
          <span className="subbrand-name">BETA</span>
        </span>
        <ToolbarControls />
      </div>
    );
  }
}

const UndoRedo = connect(
  (state) => {
    return {
      canUndo: state.items.get("data").get("past").size > 0,
      canRedo: state.items.get("data").get("future").size > 0,
    };
  },
  {
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo,
  }
)(
  class UndoRedo extends React.PureComponent {
    render() {
      var { canUndo, onUndo, canRedo, onRedo } = this.props;
      return (
        <React.Fragment>
          {canUndo && <IconButton icon="undo" onClick={onUndo} />}
          {canRedo && <IconButton icon="redo" onClick={onRedo} />}
        </React.Fragment>
      );
    }
  }
);

const ToolbarControls = connect(
  null,
  { saveAll }
)(
  class ToolbarControls extends React.PureComponent {
    constructor(props) {
      super(props);
      this.onMenuClick = this.onMenuClick.bind(this);
    }

    render() {
      return (
        <div className="controls">
          <UndoRedo />
          <SimpleMenu
            handle={<IconButton icon="add" />}
            onSelect={this.onMenuClick}
            anchorCorner="topRight">
            <MenuItem>Text</MenuItem>
            <MenuItem>Sign</MenuItem>
          </SimpleMenu>
          <IconButton icon="save" onClick={this.props.saveAll} />
        </div>
      );
    }

    onMenuClick(evt) {
      var { dispatch } = this.props;
      dispatch(addItem(evt.detail.index === 0 ? "text" : "sign"));
    }
  }
);

export default connect()(Toolbar);
