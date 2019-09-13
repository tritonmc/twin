import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import HighlighOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `0px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PatternField = ({ value, onUpdate, onDelete }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        label={"Pattern"}
        defaultValue={value}
        onBlur={onUpdate}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <IconButton className={classes.button} aria-label="Delete" onClick={onDelete}>
        <HighlighOffIcon />
      </IconButton>
    </div>
  );
};

export default PatternField;
