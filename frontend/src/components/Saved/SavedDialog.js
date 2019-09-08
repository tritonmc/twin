import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import ClipboardText from "mdi-material-ui/ClipboardText";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Redirect } from "react-router-dom";

const styles = (theme) => ({
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
});

class SavedDialog extends Component {
  state = {
    redirect: false,
  };

  backHome = () => this.setState({ redirect: true });

  showSnack = () => {
    this.props.enqueueSnackbar("Copied to clipboard!", { variant: "info" });
  };

  render() {
    if (this.state.redirect) return <Redirect to={"/"} />;
    const { classes } = this.props;
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
            <code>/twin {this.props.configId}</code>
          </Typography>
          <div className={classes.buttonContainer}>
            <div>
              <CopyToClipboard text={"/twin " + this.props.configId}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.showSnack}
                  className={classes.button}>
                  <ClipboardText />
                  Copy to Clipboard
                </Button>
              </CopyToClipboard>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.backHome}
                className={classes.button}>
                <HomeIcon />
                Back Home
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(SavedDialog));
