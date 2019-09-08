import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { fromJS, Map } from "immutable";
import React, { Component } from "react";
import uuid from "uuid/v4";
import ServerItem from "./ServerItem";
import AddIcon from "@material-ui/icons/Add";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { withSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    paddingTop: 64,
  },
  code: {
    color: theme.palette.secondary.main,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});

class Migration extends Component {
  state = {
    servers: fromJS([{ id: uuid(), name: "", content: "" }]),
    result: undefined,
  };

  changeField = (id, key, value) => {
    var index = this.state.servers.findKey((v) => v.get("id", "") === id);
    this.setState({ servers: this.state.servers.update(index, (v) => v.set(key, value)) });
  };

  deleteItem = (id) => {
    var index = this.state.servers.findKey((v) => v.get("id", "") === id);
    this.setState({ servers: this.state.servers.delete(index) });
  };

  addItem = () => {
    this.setState({ servers: this.state.servers.push(Map({ id: uuid(), name: "", content: "" })) });
  };

  closeDialog = () => {
    this.setState({ result: undefined });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant="h6">Migration from v0</Typography>
          <Typography variant="body1">
            Paste the content of every <code className={classes.code}>languages.json</code> file in
            your Spigot servers bellow to merge them into a single one for BungeeCord.
          </Typography>
          {this.state.servers.map((server) => (
            <ServerItem
              key={server.get("id")}
              id={server.get("id")}
              name={server.get("name")}
              content={server.get("content")}
              changeField={this.changeField}
              deleteItem={this.deleteItem}
            />
          ))}
          <Button className={classes.button} color="primary" onClick={this.addItem}>
            <AddIcon className={classes.leftIcon} /> Add Server
          </Button>
          <Button className={classes.button} color="primary" onClick={this.migrate}>
            <CloudDownloadIcon className={classes.leftIcon} /> Get Result
          </Button>
        </Paper>
        <Dialog
          open={this.state.result !== undefined}
          onClose={this.closeDialog}
          aria-labelledby="migration-result-dialog-title">
          <DialogTitle id="migration-result-dialog-title">Migration Result</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paste this into your BungeeCord's <code className={classes.code}>languages.json</code>
              .
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={8}
              value={this.state.result}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  migrate = () => {
    var compare = (o1, o2) => {
      for (var p in o1) {
        if (o1.hasOwnProperty(p)) {
          if (Array.isArray(o1[p]) && Array.isArray(o2[p])) {
            if (!compare(o1[p], o2[p])) return false;
          } else if (o1[p] !== o2[p]) {
            return false;
          }
        }
      }
      for (var p2 in o2) {
        if (o2.hasOwnProperty(p2)) {
          if (Array.isArray(o1[p2]) && Array.isArray(o2[p2])) {
            if (!compare(o1[p2], o2[p2])) return false;
          } else if (o1[p2] !== o2[p2]) {
            return false;
          }
        }
      }
      return true;
    };
    var find = (item) => (obj) => {
      if (item.key !== obj.key) return false;
      if (item.type !== obj.type) return false;
      if (item.description !== obj.description) return false;
      if (!compare(item.tags, obj.tags)) return false;
      if (item.type === "text") {
        if (!compare(item.languages, obj.languages)) return false;
        return true;
      }
      if (item.type === "sign") {
        if (!compare(item.lines, obj.lines)) return false;
        return true;
      }
      return false;
    };
    var result = [];
    this.state.servers.forEach((server) => {
      try {
        var items = JSON.parse(server.get("content", "[]"));
        items.forEach((e) => {
          var found = result.find(find(e));
          if (found) {
            if (e.type === "text") {
              found.servers.push(server.get("name", ""));
            } else if (e.type === "sign") {
              e.locations.forEach((loc) =>
                found.locations.push({
                  ...loc,
                  server: server.get("name", ""),
                })
              );
            }
          } else {
            if (e.type === "text") {
              result.push({ ...e, servers: [server.get("name", "")], universal: false });
            } else if (e.type === "sign") {
              result.push({
                ...e,
                locations: e.locations.map((loc) => ({ ...loc, server: server.get("name", "") })),
              });
            }
          }
        });
      } catch (e) {
        console.error(e);
        this.props.enqueueSnackbar(
          "Invalid JSON for server " + server.get("name", "unknown") + "!",
          { variant: "error" }
        );
      }
    });
    this.setState({ result: JSON.stringify(result, null, 2) });
  };
}

export default withSnackbar(withStyles(styles)(Migration));
