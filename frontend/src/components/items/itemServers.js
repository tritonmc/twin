import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { IconButton } from "@rmwc/icon-button";
import { addItemServer, removeItemServer } from "../../actions/items";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";

class ItemServers extends PureComponent {
  constructor(props) {
    super(props);
    this.serverInput = React.createRef();
  }

  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell phone="4" tablet="4" desktop="6">
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Servers</span>
          {this.props.servers &&
            this.props.servers.map((server) => (
              <GridCell key={server} phone="4" tablet="8" desktop="12" className="tag-cell">
                <span>{server}</span>
                <IconButton
                  icon="delete_forever"
                  onClick={() => {
                    dispatch(removeItemServer(langKey, server));
                  }}
                />
              </GridCell>
            ))}
          <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
            <div className="mdc-text-field-wrapper">
              <TextField dense label="Add a new server" red={this.serverInput} />
            </div>
            <IconButton
              icon="add_circle"
              onClick={() => {
                if (!this.serverInput || !this.serverInput.current.value) {
                  dispatch(
                    showSnack("", {
                      label: "You can't add an empty server!",
                      timeout: 7000,
                      button: { label: "OK, GOT IT" },
                    })
                  );
                  return;
                }
                if (this.props.servers.includes(this.serverInput.current.value)) {
                  dispatch(
                    showSnack("", {
                      label: "Server already exists!",
                      timeout: 7000,
                      button: { label: "OK, GOT IT" },
                    })
                  );
                  return;
                }
                dispatch(addItemServer(langKey, this.serverInput.current.value));
                this.serverInput.current.value = "";
              }}
            />
          </GridCell>
        </GridInner>
      </GridCell>
    );
  }
}

export default connect()(ItemServers);
