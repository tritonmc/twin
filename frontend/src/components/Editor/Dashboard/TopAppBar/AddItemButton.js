import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SvgIcon,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import NotesIcon from "@material-ui/icons/Notes";
import { ADD_ITEM, ADD_ITEM_SIGN, ADD_ITEM_TEXT } from "constants/HotKeys";
import Mousetrap from "mousetrap";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { v4 as uuid } from "uuid";
import { addItem } from "../../../../actions/items";

const useStyles = makeStyles((theme) => ({
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
}));

const AddItemButton = ({ collection, list }) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const nextIndex = useSelector((state) => state.items.get("present").size);
  const history = useHistory();
  const { id: configId } = useParams();

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);
  const handleAddItem = useCallback(
    (type) => () => {
      toggleDialog();
      dispatch(addItem(type, uuid(), collection || "default"));
      history.push(`/${configId}/translation/${nextIndex}`);
    },
    [toggleDialog, dispatch, collection, history, configId, nextIndex]
  );

  useEffect(() => {
    Mousetrap.bind(ADD_ITEM.sequence, toggleDialog);
    if (isOpen) {
      Mousetrap.bind(ADD_ITEM_TEXT.sequence, handleAddItem("text"));
      Mousetrap.bind(ADD_ITEM_SIGN.sequence, handleAddItem("sign"));
    }

    return () => {
      Mousetrap.unbind(ADD_ITEM.sequence);
      Mousetrap.unbind(ADD_ITEM_TEXT.sequence);
      Mousetrap.unbind(ADD_ITEM_SIGN.sequence);
    };
  }, [handleAddItem, isOpen, toggleDialog]);

  return (
    <>
      {list ? (
        <MenuItem onClick={toggleDialog}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Item" />
        </MenuItem>
      ) : (
        <Tooltip title="Add Item">
          <IconButton color="inherit" aria-label="Add Item" onClick={toggleDialog}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog onClose={toggleDialog} aria-labelledby="simple-dialog-title" open={isOpen}>
        <DialogTitle id="simple-dialog-title">
          <IconButton aria-label="Close" className={classes.inlineIcon} onClick={toggleDialog}>
            <CloseIcon />
          </IconButton>
          Select new item type
        </DialogTitle>
        <div className={classes.dialogContent}>
          <Button variant="outlined" className={classes.button} onClick={handleAddItem("text")}>
            <div className={classes.innerButton}>
              <NotesIcon className={classes.buttonIcon} />
              <Typography variant="body1">Text</Typography>
              <Typography variant="caption">
                Can be used in chat, scoreboards, items, etc...
              </Typography>
            </div>
          </Button>
          <Button variant="outlined" className={classes.button} onClick={handleAddItem("sign")}>
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
};

export default AddItemButton;
