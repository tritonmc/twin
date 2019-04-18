import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import NotesIcon from "@material-ui/icons/Notes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../../actions/items";
import uuid from "uuid/v4";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
    width: 150,
    textTransform: "unset",
    flexDirection: "column",
    alignItems: "flex-start",
    display: "inline-block",
  },
  innerButton: {
    display: "inline-flex",
    flexDirection: "column",
    textAlign: "center",
  },
  buttonIcon: {
    margin: "auto",
    fontSize: 50,
  },
  dialogContent: {
    display: "flex",
    margin: theme.spacing.unit * 2,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  inlineIcon: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class AddItemButton extends Component {
  state = {
    isOpen: false,
  };

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  addItem = (type) => () => {
    this.toggleDialog();
    this.props.addItem(type);
  };

  render() {
    const { isOpen } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Tooltip title="Add Item">
          <IconButton aria-label="Add Item" onClick={this.toggleDialog}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Dialog onClose={this.toggleDialog} aria-labelledby="simple-dialog-title" open={isOpen}>
          <DialogTitle id="simple-dialog-title">
            <IconButton
              aria-label="Close"
              className={classes.inlineIcon}
              onClick={this.toggleDialog}>
              <CloseIcon />
            </IconButton>
            Select new item type
          </DialogTitle>
          <div className={classes.dialogContent}>
            <Button variant="outlined" className={classes.button} onClick={this.addItem("text")}>
              <div className={classes.innerButton}>
                <NotesIcon className={classes.buttonIcon} />
                <Typography variant="body1">Text</Typography>
                <Typography variant="caption">
                  Can be used in chat, scoreboards, items, etc...
                </Typography>
              </div>
            </Button>
            <Button variant="outlined" className={classes.button} onClick={this.addItem("sign")}>
              <div className={classes.innerButton}>
                <NotesIcon className={classes.buttonIcon} />
                <Typography variant="body1">Sign Group</Typography>
                <Typography variant="caption">Can be used in multiple signs</Typography>
              </div>
            </Button>
          </div>
        </Dialog>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (type) => dispatch(addItem(type, uuid())),
});

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(AddItemButton)
);
