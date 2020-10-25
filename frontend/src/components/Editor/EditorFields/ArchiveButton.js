import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleArchiveState } from "../../../actions/items";
import { useHistory } from "react-router";

const ArchiveButton = ({ id, archived, bulk }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const closeTranslation = useCallback(() => history.goBack(), [history]);

  const onClick = () => {
    if (!bulk) closeTranslation();
    dispatch(toggleArchiveState(id, !archived));
    if (archived) {
      enqueueSnackbar(
        `${
          bulk ? `${id.size} ${id.size === 1 ? "item has" : "items have"}` : "Item has"
        } been unarchived!`
      );
    } else {
      enqueueSnackbar(
        `${
          bulk ? `${id.size} ${id.size === 1 ? "item has" : "items have"}` : "Item has"
        } has been archived!`
      );
    }
  };
  return (
    <Tooltip title={`${archived ? "Unarchive" : "Archive"}${bulk ? " selected" : ""}`}>
      <IconButton color="inherit" onClick={onClick} aria-label={archived ? "Unarchive" : "Archive"}>
        {archived ? <UnarchiveIcon /> : <ArchiveIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ArchiveButton;
