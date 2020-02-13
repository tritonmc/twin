import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import MoveIcon from "@material-ui/icons/MoveToInboxRounded";
import { makeStyles } from "@material-ui/styles";
import { Map } from "immutable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveCollectionBulk } from "../../../actions/items";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

const MoveCollectionBulk = ({ items }) => {
  const collections = useSelector((state) => state.editor.get("metadata", Map()).keySeq());
  const dispatch = useDispatch();
  const classes = useStyles();

  const [collection, setCollection] = React.useState("");

  const handleMove = () => {
    dispatch(moveCollectionBulk(items, collection));
    handleClose();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCollection("");
  };

  const handleChange = (event) => {
    setCollection(event.target.value);
  };

  if (collections.size <= 1) return null;

  return (
    <>
      <Tooltip title="Move to collection">
        <IconButton color="inherit" onClick={handleClickOpen} aria-label="Move">
          <MoveIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title-move-collection-bulk">
        <DialogTitle id="form-dialog-title-move-collection-bulk">
          {`Move ${items.size} ${items.size === 1 ? "item" : "items"} to collection`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will move all the selected items to the specified collection.
          </DialogContentText>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="move-collection-bulk-select">Collection</InputLabel>
            <Select
              labelId="move-collection-bulk-select"
              value={collection}
              onChange={handleChange}>
              {collections.sort().map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleMove} color="primary" disabled={collection === ""}>
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MoveCollectionBulk;
