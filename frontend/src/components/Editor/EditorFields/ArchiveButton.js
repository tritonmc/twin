import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleArchiveState } from "../../../actions/items";

class ArchiveButton extends Component {
  render() {
    const { archived, toggleArchiveState, bulk } = this.props;
    return (
      <Tooltip title={`${archived ? "Unarchive" : "Archive"}${bulk ? " selected" : ""}`}>
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
    dispatch(toggleArchiveState(ownProps.id, !ownProps.archived));
    if (ownProps.archived) {
      ownProps.enqueueSnackbar(
        `${
          ownProps.bulk
            ? `${ownProps.id.size} ${ownProps.id.size === 1 ? "item has" : "items have"}`
            : "Item has"
        } been unarchived!`
      );
    } else {
      ownProps.enqueueSnackbar(
        `${
          ownProps.bulk
            ? `${ownProps.id.size} ${ownProps.id.size === 1 ? "item has" : "items have"}`
            : "Item has"
        } has been archived!`
      );
    }
  },
});

export default withSnackbar(connect(null, mapDispatchToProps)(ArchiveButton));
