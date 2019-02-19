import React from "react";
import { connect } from "react-redux";
import { Elevation } from "@rmwc/elevation";
import { showSnack } from "react-redux-snackbar";
import { fromJS, Map } from "immutable";
import uuid from "uuid/v4";
import MigratedServer from "./migration/migratedServer";
import { Button, ButtonIcon } from "@rmwc/button";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog";
import { TextField } from "@rmwc/textfield";

class Migrate extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      servers: fromJS([{ id: uuid(), name: "lobby", content: "" }]),
      result: undefined,
    };
    this.callback = this.callback.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.migrate = this.migrate.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
  }

  callback(id, key, value) {
    var index = this.state.servers.findKey((v) => v.get("id", "") === id);
    this.setState({ servers: this.state.servers.update(index, (v) => v.set(key, value)) });
  }

  delete(id) {
    var index = this.state.servers.findKey((v) => v.get("id", "") === id);
    this.setState({ servers: this.state.servers.delete(index) });
  }

  add() {
    this.setState({ servers: this.state.servers.push(Map({ id: uuid(), name: "", content: "" })) });
  }

  dialogClose() {
    this.setState({ result: undefined });
  }

  render() {
    return (
      <div className="dashboard">
        <Elevation z="3" className="dashboard-content migration">
          <h1>Migration</h1>
          <p>
            Paste the contents of every <code>languages.json</code> file in your Spigot servers
            below to merge them into a single one.
          </p>
          {this.state.servers.map((server) => (
            <MigratedServer
              key={server.get("id")}
              name={server.get("name")}
              content={server.get("content")}
              id={server.get("id")}
              callback={this.callback}
              delete={this.delete}
            />
          ))}
          <Button onClick={this.add}>
            <ButtonIcon icon="add" /> Add Server
          </Button>
          <Button onClick={this.migrate}>
            <ButtonIcon icon="cloud_download" /> Get Result
          </Button>
        </Elevation>
        <Dialog open={this.state.result !== undefined} onClose={this.dialogClose}>
          <DialogTitle>Migration result</DialogTitle>
          <DialogContent>
            Paste this into your BungeeCord's <code>languages.json</code>.
            <TextField textarea fullwidth rows="8" value={this.state.result} />
          </DialogContent>
          <DialogActions>
            <DialogButton action="close" isDefaultAction>
              Close
            </DialogButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  migrate() {
    var compare = (o1, o2) => {
      for (let p in o1) {
        if (o1.hasOwnProperty(p)) {
          if (Array.isArray(o1[p]) && Array.isArray(o2[p])) {
            if (!compare(o1[p], o2[p])) return false;
          } else if (o1[p] !== o2[p]) {
            return false;
          }
        }
      }
      for (let p in o2) {
        if (o2.hasOwnProperty(p)) {
          if (Array.isArray(o1[p]) && Array.isArray(o2[p])) {
            if (!compare(o1[p], o2[p])) return false;
          } else if (o1[p] !== o2[p]) {
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
        this.props.dispatch(
          showSnack("", {
            label: "Invalid JSON for server " + server.get("name", "unknown") + "!",
            timeout: 3000,
            button: { label: "OK, GOT IT" },
          })
        );
      }
    });
    this.setState({ result: JSON.stringify(result, null, 2) });
  }
}

export default connect()(Migrate);
