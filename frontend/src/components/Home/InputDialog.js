import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { Component } from "react";
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
});

class InputDialog extends Component {
  constructor() {
    super();
    this.state = { redirect: false, configId: "" };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.loadConfig = this.loadConfig.bind(this);
  }

  onKeyDown(evt) {
    if (evt.key !== "Enter") return;
    this.loadConfig();
  }

  onChange(evt) {
    this.setState({ configId: evt.target.value });
  }

  loadConfig() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) return <Redirect to={"/" + this.state.configId} push />;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h6">To start editing, please enter your Config ID</Typography>
          <Typography variant="body1">
            You can get your Config ID by doing <code>/twin</code> in-game
          </Typography>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            label="Config ID"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            className={classes.textField}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.loadConfig}
              className={classes.button}>
              Load Config
              <ChevronRightIcon />
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(InputDialog);
