import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import { makeStyles } from "@material-ui/styles";
import { Map } from "immutable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCollection } from "../../actions/editor";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

const RemoveCollectionButton = () => {
  const collections = useSelector((state) => state.editor.get("metadata", Map()).keySeq());
  const dispatch = useDispatch();
  const classes = useStyles();

  const [collection, setCollection] = React.useState("");

  const handleAdd = () => {
    dispatch(deleteCollection(collection));
    handleClose();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setCollection("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCollection(event.target.value);
  };

  if (collections.size <= 1) return null;

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>Delete collection</ListItemText>
      </ListItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Collections are the JSON files inside your <em>translations</em> folder. By deleting a
            collection here, that file will be deleted and all translations will be moved to the{" "}
            <em>default</em> collection. This action is irreversible.
          </DialogContentText>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="delete-collection-select">Collection</InputLabel>
            <Select labelId="delete-collection-select" value={collection} onChange={handleChange}>
              {collections
                .filterNot((v) => v === "default")
                .sort()
                .map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>
              Existing translations will be moved to the <em>default</em> collection
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary" disabled={collection === ""}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveCollectionButton;
