import React from "react";
import { connect } from "react-redux";
import { DialogButton } from "@rmwc/dialog";

class DeleteButton extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <DialogButton action="delete" outlined className="delete-button">
        Delete
      </DialogButton>
    );
  }
}

export default connect()(DeleteButton);
