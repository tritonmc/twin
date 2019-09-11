import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/AddRounded";
import React from "react";
import { useDispatch } from "react-redux";
import { addCollection } from "../../actions/editor";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

const AddCollectionButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const textFieldRef = React.useRef(null);

  const handleAdd = () => {
    dispatch(addCollection(textFieldRef.current.value));
    handleClose();
  };

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Add collection</ListItemText>
      </ListItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Collections are the JSON files inside your <em>translations</em> folder. By adding a
            collection here, a new file will be generated in the server. To delete a collection,
            just delete the file in the <em>translations</em> folder.
          </DialogContentText>
          <TextField
            inputRef={textFieldRef}
            autoFocus
            margin="dense"
            id="add-collection"
            label="Collection Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCollectionButton;
