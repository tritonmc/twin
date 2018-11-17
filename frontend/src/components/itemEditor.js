import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog";
import { setActiveItem, deleteItem } from "../actions/items";
import { TextItem, SignItem } from "./items";
import DeleteButton from "./items/itemDelete";

class ItemEditor extends PureComponent {
  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
  }
  onClose(evt) {
    if (evt.detail.action === "delete") {
      this.props.deleteItem(this.props.activeItem);
    }
    this.props.close();
  }

  render() {
    var { activeItem, type } = this.props;
    return (
      <Dialog className="item-editor" open={activeItem !== undefined} onClose={this.onClose}>
        <DialogTitle>Editing {type}</DialogTitle>
        <DialogContent>
          {type === "text" ? (
            <TextItem id={activeItem} />
          ) : type === "sign" ? (
            <SignItem id={activeItem} />
          ) : (
            "An error occurred."
          )}
        </DialogContent>
        <DialogActions>
          <DeleteButton />
          <DialogButton action="close" isDefaultAction>
            Close
          </DialogButton>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (store) => {
  var activeItem = store.items.get("activeItem");
  return {
    activeItem: activeItem,
    type: store.items.getIn(["data", "present", activeItem, "type"], "unknown"),
  };
};

const mapDispatchToProps = { close: setActiveItem, deleteItem };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemEditor);
