import React from "react";
import { IconButton } from "@rmwc/icon-button";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo-immutable";
import { setLoading } from "../actions/main";
import { addItem } from "../actions/items";
import { showSnack } from "react-redux-snackbar";
import { SimpleMenu, MenuItem } from "@rmwc/menu";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  onSave() {
    var { dispatch, data, defaultData } = this.props;
    dispatch(setLoading(true));
    if (data.equals(defaultData)) {
      dispatch(
        showSnack("", {
          label: "Nothing has changed! Start editing!",
          timeout: 3000,
          action: "OK, GOT IT",
        })
      );
      dispatch(setLoading(false));
      return;
    }
  }

  onMenuClick(evt) {
    var { dispatch } = this.props;
    dispatch(addItem(evt.detail.index === 0 ? "text" : "sign"));
  }

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
        <div className="controls">
          <UndoRedo />
          <SimpleMenu
            handle={<IconButton icon="add" />}
            onSelect={this.onMenuClick}
            anchorCorner="topRight">
            <MenuItem>Text</MenuItem>
            <MenuItem>Sign</MenuItem>
          </SimpleMenu>
          <IconButton icon="save" onClick={this.onSave} />
        </div>
      </div>
    );
  }
}

const UndoRedo = connect(
  (state) => {
    return {
      canUndo: state.items.itemListRoot.get("data").get("past").size > 0,
      canRedo: state.items.itemListRoot.get("data").get("future").size > 0,
    };
  },
  (dispatch) => {
    return {
      onUndo: () => dispatch(UndoActionCreators.undo()),
      onRedo: () => dispatch(UndoActionCreators.redo()),
    };
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

const mapStateToProps = (state) => {
  var root = state.items.itemListRoot;
  return {
    data: root.get("data"),
    //TODO tritonVersion: root.get("tritonVersion"),
    bungee: root.get("bungee"),
    defaultData: root.get("defaultData"),
  };
};

export default connect(mapStateToProps)(Toolbar);
