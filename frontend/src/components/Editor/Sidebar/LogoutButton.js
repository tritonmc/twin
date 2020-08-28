import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogoutIcon from "mdi-material-ui/Logout";
import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logoutButton: {
    color: theme.palette.error.main,
  },
}));

const LogoutButton = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <ListItem button onClick={openDialog}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItem>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description">
        <DialogTitle id="logout-dialog-title">Leave without saving?</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            If you leave now, any changes you made won't be saved! You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            className={classes.logoutButton}
            autoFocus
            component={React.forwardRef((props, ref) => (
              <Link innerRef={ref} to="/" {...props} />
            ))}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
