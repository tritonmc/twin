import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteItem } from "../../../actions/items";

const useStyles = makeStyles((theme) => ({
  deleteConfirmButton: {
    color: theme.palette.error.main,
  },
}));

const DeleteButton = ({ bulk, item }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const handleCloseDelete = () => {
    handleClose();
    dispatch(deleteItem(item));
    if (!bulk) history.goBack();
  };

  return (
    <>
      <Tooltip title={bulk ? "Delete selected" : "Delete"}>
        <IconButton color="inherit" onClick={handleClickOpen} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Delete ${
          bulk && item.size !== 1 ? "these items" : "this item"
        }?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${
              bulk ? `${item.size} ${item.size === 1 ? "item" : "items"}` : "This item"
            } will be permanently deleted after saving. If you only want to disable ${
              bulk && item.size !== 1 ? "these items" : "this item"
            }, just archive ${bulk && item.size !== 1 ? "them" : "it"} instead.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDelete} autoFocus className={classes.deleteConfirmButton}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
