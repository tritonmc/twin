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
import SvgIcon from "@material-ui/core/SvgIcon";
import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { addItem } from "../../../actions/items";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
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
    margin: theme.spacing(2),
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
    const { classes, list } = this.props;
    return (
      <>
        {list ? (
          <MenuItem onClick={this.toggleDialog}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Sort by" />
          </MenuItem>
        ) : (
          <Tooltip title="Add Item">
            <IconButton color="inherit" aria-label="Add Item" onClick={this.toggleDialog}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
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
                <SvgIcon className={classes.buttonIcon} viewBox="0 0 3.704 3.704">
                  <path
                    d="M2.117 3.44H2.381v0.265H2.117Zm0-0.265H2.381v0.265H2.117Zm0-0.265H2.381v0.265H2.117Zm0-0.265H2.381v0.265H2.117Zm0-0.265H2.381v0.265H2.117Zm-0.265 0h0.265v0.265H1.852Zm0 0.265h0.265v0.265H1.852Zm0 0.265h0.265v0.265H1.852Zm0 0.265h0.265v0.265H1.852Zm0 0.265h0.265v0.265H1.852Zm-0.265 0h0.265v0.265H1.588Zm0-0.265h0.265v0.265H1.588Zm0-0.265h0.265v0.265H1.588Zm0-0.265h0.265v0.265H1.588Zm0-0.265h0.265v0.265H1.588Zm1.852-0.794h0.265v0.265H3.44Zm0 0.265h0.265v0.265H3.44Zm0 0.265h0.265v0.265H3.44Zm-0.265 0h0.265v0.265H3.175Zm-0.265 0H3.175v0.265H2.91Zm-0.265 0h0.265v0.265H2.646Zm-0.265 0h0.265v0.265H2.381Zm-0.265 0H2.381v0.265H2.117Zm-0.265 0h0.265v0.265H1.852Zm-0.265 0h0.265v0.265H1.588Zm-0.265 0H1.588v0.265H1.323Zm-0.265 0h0.265v0.265H1.058ZM0 0.529h0.265v0.265H0Zm0 0.265h0.265v0.265H0Zm0 0.265h0.265v0.265H0Zm0 0.265h0.265v0.265H0Zm0 0.265h0.265v0.265H0Zm0 0.265h0.265v0.265H0Zm0 0.265h0.265v0.265H0Zm0.265 0h0.265v0.265H0.265Zm0.529 0h0.265v0.265H0.794Zm-0.265 0h0.265v0.265H0.529ZM0 0.265h0.265v0.265H0Zm2.91 1.323H3.175v0.265H2.91Zm0-0.265H3.175v0.265H2.91Zm0-0.794H3.175v0.265H2.91Zm0 0.265H3.175v0.265H2.91Zm-0.265 0h0.265v0.265H2.646ZM2.381 0.529h0.265v0.265H2.381Zm0 0.265h0.265v0.265H2.381Zm-0.265 0H2.381v0.265H2.117Zm0-0.265H2.381v0.265H2.117ZM1.588 0.794h0.265v0.265H1.588Zm-0.265 0H1.588v0.265H1.323Zm1.058 0.529h0.265v0.265H2.381Zm0 0.265h0.265v0.265H2.381Zm-0.265 0H2.381v0.265H2.117Zm-0.265 0h0.265v0.265H1.852ZM1.588 1.323h0.265v0.265H1.588Zm0 0.265h0.265v0.265H1.588Zm-0.265 0H1.588v0.265H1.323Zm0-0.265H1.588v0.265H1.323Zm2.117-0.529h0.265v0.265H3.44Zm0 0.265h0.265v0.265H3.44Zm0 0.265h0.265v0.265H3.44Zm-2.91 0.265h0.265v0.265H0.529Zm0.265 0h0.265v0.265H0.794Zm0-0.265h0.265v0.265H0.794Zm0-0.529h0.265v0.265H0.794Zm-0.265 0h0.265v0.265H0.529Zm0-0.265h0.265v0.265H0.529Zm2.91 0h0.265v0.265H3.44Zm0-0.265h0.265v0.265H3.44Zm0-0.265h0.265v0.265H3.44Zm-0.265 0h0.265v0.265H3.175Zm-0.265 0H3.175v0.265H2.91Zm-0.265 0h0.265v0.265H2.646Zm-0.265 0h0.265v0.265H2.381Zm-0.265 0H2.381v0.265H2.117Zm-0.265 0h0.265v0.265H1.852Zm-0.265 0h0.265v0.265H1.588Zm-0.265 0H1.588v0.265H1.323Zm-0.265 0h0.265v0.265H1.058Zm-0.265 0h0.265v0.265H0.794Zm-0.265 0h0.265v0.265H0.529Zm-0.265 0h0.265v0.265H0.265ZM0 0h0.265v0.265H0Z"
                    strokeWidth="0.26"
                  />
                </SvgIcon>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: (type) => dispatch(addItem(type, uuid(), ownProps.collection || "default")),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(AddItemButton));
