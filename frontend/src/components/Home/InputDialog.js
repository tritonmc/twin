import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "column",
  },
  button: {
    marginTop: theme.spacing(1),
    alignSelf: "flex-end",
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const InputDialog = () => {
  const [configId, setConfigId] = useState("");
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const loadConfig = () => {
    if (configId) history.push(`/${configId}`);
  };
  const onChange = (evt) => setConfigId(evt.target.value);
  const onKeyDown = (evt) => {
    if (evt.key === "Enter") loadConfig();
  };

  console.log(location);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6">To start editing, please enter your Config ID</Typography>
        <Typography variant="body1">
          You can get your Config ID by doing <code>/twin</code> in-game
        </Typography>
        {location?.state?.error && (
          <Typography variant="body2" color="error">
            Config not found! Make sure your ID is valid.
          </Typography>
        )}
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          label="Config ID"
          onKeyDown={onKeyDown}
          onChange={onChange}
          className={classes.textField}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={loadConfig}
            className={classes.button}>
            Load Config
            <ChevronRightIcon />
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default InputDialog;
