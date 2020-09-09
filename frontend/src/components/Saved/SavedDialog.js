import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import ClipboardText from "mdi-material-ui/ClipboardText";
import { useSnackbar } from "notistack";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: "20px",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-end",
    paddingTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

const SavedDialog = ({ configId }) => {
  const classes = useStyles();
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const redirectToHomePage = () => replace("/");
  const showCopySnackbar = () => enqueueSnackbar("Copied to clipboard!", { variant: "info" });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Config saved
        </Typography>
        <Typography variant="body1">
          You can deploy it on your server by executing the following command:
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          <code>/twin {configId}</code>
        </Typography>
        <div className={classes.buttonContainer}>
          <div>
            <CopyToClipboard text={`/twin ${configId}`}>
              <Button
                variant="outlined"
                color="primary"
                onClick={showCopySnackbar}
                className={classes.button}>
                <ClipboardText />
                Copy to Clipboard
              </Button>
            </CopyToClipboard>
            <Button
              variant="outlined"
              color="primary"
              onClick={redirectToHomePage}
              className={classes.button}>
              <HomeIcon />
              Back Home
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default SavedDialog;
