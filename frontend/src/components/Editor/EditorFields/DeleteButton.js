import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { Component } from "react";
import { connect } from "react-redux";
import { closeEditor } from "../../../actions/editor";
import { deleteItem } from "../../../actions/items";

const styles = (theme) => ({
  deleteConfirmButton: {
    color: theme.palette.error.main,
  },
});

class DeleteButton extends Component {
  constructor() {
    super();
    this.state = { dialogOpen: false };
  }
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleCloseDelete = () => {
    this.handleClose();
    this.props.deleteItem();
  };

  render() {
    return (
      <>
        <Tooltip title="Delete">
          <IconButton color="inherit" onClick={this.handleClickOpen} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Delete this item?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The item will be permanently deleted after saving. If you only want to disable this
              item, just archive it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleCloseDelete}
              autoFocus
              className={this.props.classes.deleteConfirmButton}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteItem: () => {
    dispatch(deleteItem(ownProps.item));
    dispatch(closeEditor());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DeleteButton));