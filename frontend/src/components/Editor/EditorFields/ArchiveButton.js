import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { connect } from "react-redux";
import { closeEditor } from "../../../actions/editor";
import { toggleArchiveState } from "../../../actions/items";

class DeleteButton extends Component {
  render() {
    const { archived, toggleArchiveState } = this.props;
    return (
      <Tooltip title={archived ? "Unarchive" : "Archive"}>
        <IconButton
          color="inherit"
          onClick={toggleArchiveState}
          aria-label={archived ? "Unarchive" : "Archive"}>
          {archived ? <UnarchiveIcon /> : <ArchiveIcon />}
        </IconButton>
      </Tooltip>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleArchiveState: () => {
    dispatch(toggleArchiveState(ownProps.id));
    if (ownProps.archived) {
      ownProps.enqueueSnackbar("Item has been unarchived!");
    } else {
      ownProps.enqueueSnackbar("Item has been archived!");
    }
    dispatch(closeEditor());
  },
});

export default withSnackbar(
  connect(
    null,
    mapDispatchToProps
  )(DeleteButton)
);
