import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { IconButton } from "@rmwc/icon-button";
import { addItemServer, removeItemServer } from "../../actions/items";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";
import { Map, List } from "immutable";

class ItemServers extends PureComponent {
  constructor(props) {
    super(props);
    this.onServerRemoveClick = this.onServerRemoveClick.bind(this);
  }

  render() {
    var { dispatch, id, universal, bungee } = this.props;
    if (!bungee || universal) return null;
    return (
      <GridCell phone="4" tablet="4" desktop="6">
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Servers</span>
          {this.props.servers &&
            this.props.servers.map((server) => (
              <ServerItem key={server} value={server} onClick={this.onServerRemoveClick} />
            ))}
          <ServerInput dispatch={dispatch} langKey={id} servers={this.props.servers} />
        </GridInner>
      </GridCell>
    );
  }
  onServerRemoveClick(value) {
    var { dispatch, id } = this.props;
    dispatch(removeItemServer(id, value));
  }
}

class ServerAddButton extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    var { onClick } = this.props;
    return <IconButton icon="add_circle" onClick={onClick} />;
  }
}

class ServerItem extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    var { onClick, value } = this.props;
    return (
      <GridCell phone="4" tablet="8" desktop="12" className="tag-cell">
        <span>{value}</span>
        <IconButton icon="delete_forever" onClick={() => onClick(value)} />
      </GridCell>
    );
  }
}

class ServerInput extends React.Component {
  constructor(props) {
    super(props);
    this.serverInput = React.createRef();
    this.onServerAddClick = this.onServerAddClick.bind(this);
  }
  shouldComponentUpdate() {
    return false;
  }
  onServerAddClick() {
    var { dispatch, langKey } = this.props;
    if (!this.serverInput || !this.serverInput.current.input_.value) {
      dispatch(
        showSnack("", {
          label: "You can't add an empty server!",
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
      return;
    }
    if (this.props.servers && this.props.servers.includes(this.serverInput.current.input_.value)) {
      dispatch(
        showSnack("", {
          label: "Server already exists!",
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
      return;
    }
    dispatch(addItemServer(langKey, this.serverInput.current.input_.value));
    this.serverInput.current.input_.value = "";
  }
  render() {
    return (
      <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
        <div className="mdc-text-field-wrapper">
          <TextField dense label="Add a new server" ref={this.serverInput} />
        </div>
        <ServerAddButton onClick={this.onServerAddClick} />
      </GridCell>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  var id = ownProps.id;
  var item = store.items.getIn(["data", "present", id], Map());
  return {
    servers: item.get("servers", List()),
    universal: item.get("universal", false),
    bungee: store.items.get("bungee", false),
  };
};

export default connect(mapStateToProps)(ItemServers);
