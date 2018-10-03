import React, { Component } from "react";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { Checkbox } from "@rmwc/checkbox";
import { IconButton } from "@rmwc/icon-button";
import { Snackbar } from "@rmwc/snackbar";
import {
  changeItemKey,
  changeItemUniversal,
  changeItemBlacklist,
  changeItemDescription,
  addItemTag,
  removeItemTag,
} from "../actions/items";

class TextItem extends Component {
  constructor(props) {
    super(props);
    this.snackbarId = 0;
    this.state = {
      snackbars: {},
    };
    this.tagInput = React.createRef();
  }

  showSnackbar(text) {
    var add = {};
    add[this.snackbarId++] = (
      <Snackbar
        key={this.snackbarId}
        show={true}
        message={text}
        onHide={() => {
          var sbs = Object.assign({}, this.state.snackbars);
          sbs[this.snackbarId] = undefined;
          this.setState({
            snackbars: sbs,
          });
        }}
        alignStart
      />
    );
    this.setState({
      snackbars: Object.assign(this.state.snackbars, add),
    });
    return this.snackbarId;
  }

  render() {
    var { dispatch, langKey } = this.props;
    return (
      <div className="language-item text-item">
        {this.state.snackbars &&
          Object.keys(this.state.snackbars).map((key, index) => this.state.snackbars[key])}
        <Grid>
          <GridCell desktop="6" phone="4" tablet="8">
            <TextField
              style={{ width: "100%" }}
              defaultValue={this.props.langKey}
              onBlur={(evt) => {
                if (this.props.langKey === evt.target.value) return;
                if (!this.props.isDuplicateKey(evt.target.value))
                  dispatch(changeItemKey(langKey, evt.target.value));
                else {
                  this.showSnackbar("Duplicate key! Please choose another one!");
                  evt.target.value = langKey;
                }
              }}
              withLeadingIcon="vpn_key"
              label="Item Key"
            />
            <TextFieldHelperText>
              This is a Unique Identifier of this item. It will be used in-game to get the correct
              text.
            </TextFieldHelperText>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop="2">
            <Checkbox
              checked={this.props.universal || false}
              onChange={(evt) => dispatch(changeItemUniversal(langKey, evt.target.checked))}>
              <strong>Universal</strong>
            </Checkbox>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop="4">
            <Checkbox
              checked={this.props.blacklist || false}
              onChange={(evt) => dispatch(changeItemBlacklist(langKey, evt.target.checked))}>
              <strong>Use Server List as Blacklist</strong>
            </Checkbox>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop="12">
            <TextField
              textarea
              defaultValue={this.props.description}
              onBlur={(evt) => {
                dispatch(changeItemDescription(langKey, evt.target.value));
              }}
              label="Description"
            />
            <TextFieldHelperText>
              Use this if you want to store any information on the item. This is not used by the
              plugin.
            </TextFieldHelperText>
          </GridCell>
          <GridCell
            phone="4"
            tablet={this.props.universal === true ? "8" : "4"}
            desktop={this.props.universal === true ? "12" : "6"}>
            <GridInner>
              <span style={{ fontSize: "1.5em" }}>Tags</span>
              {this.props.tags &&
                this.props.tags.map((tag) => (
                  <GridCell key={tag} phone="4" tablet="8" desktop="12" className="tag-cell">
                    <span>{tag}</span>
                    <IconButton
                      icon="delete_forever"
                      onClick={() => {
                        dispatch(removeItemTag(langKey, tag));
                      }}
                    />
                  </GridCell>
                ))}
              <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
                <div className="mdc-text-field-wrapper">
                  <TextField dense label="Add a new tag" ref={this.tagInput} />
                </div>
                <IconButton
                  icon="add_circle"
                  onClick={() => {
                    if (!this.tagInput || !this.tagInput.current.value) {
                      this.showSnackbar("You can't add an empty tag!");
                      return;
                    }
                    if (this.props.tags.includes(this.tagInput.current.value)) {
                      this.showSnackbar("Tag already exists!");
                      return;
                    }
                    dispatch(addItemTag(langKey, this.tagInput.current.value));
                    this.tagInput.current.value = "";
                  }}
                />
              </GridCell>
            </GridInner>
          </GridCell>
          {/*{this.state.universal !== true && (
            <GridCell phone="4" tablet="4" desktop="6">
              <GridInner>
                <span style={{ fontSize: "1.5em" }}>Servers</span>
                {this.state.servers &&
                  this.state.servers.map((server) => (
                    <GridCell key={server} phone="4" tablet="8" desktop="12" className="tag-cell">
                      <span>{server}</span>
                      <IconButton
                        icon="delete_forever"
                        onClick={() => {
                          var index = this.state.servers.indexOf(server);
                          if (index !== -1) {
                            var array = this.state.servers.slice();
                            array.splice(index, 1);
                            this.setState({
                              servers: array,
                            });
                          }
                        }}
                      />
                    </GridCell>
                  ))}
                <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
                  <div className="mdc-text-field-wrapper">
                    <TextField
                      dense
                      label="Add a new server"
                      value={this.state.serverInput}
                      onChange={(evt) => {
                        this.setState({ serverInput: evt.target.value });
                      }}
                    />
                  </div>
                  <IconButton
                    icon="add_circle"
                    onClick={() => {
                      if (!this.state.serverInput) {
                        this.showSnackbar("You can't add an empty server!");
                        return;
                      }
                      if (this.state.servers.includes(this.state.serverInput)) {
                        this.showSnackbar("Server already exists!");
                        return;
                      }
                      var servers = this.state.servers.slice();
                      servers.push(this.state.serverInput);
                      this.setState({
                        serverInput: "",
                        servers: servers,
                      });
                    }}
                  />
                </GridCell>
              </GridInner>
            </GridCell>
          )}
          <GridCell phone="4" tablet="8" desktop="12">
            <GridInner>
              <span style={{ fontSize: "1.5em" }}>Text</span>
              {this.props.availableLanguages ? (
                this.props.availableLanguages.map((lang) => (
                  <GridCell key={lang} phone="4" tablet="8" desktop="12">
                    <TextField
                      outlined
                      style={{ width: "100%" }}
                      label={lang}
                      value={this.state.languages && this.state.languages[lang]}
                      onChange={(evt) => {
                        var languages = Object.assign(this.state.language, {});
                        languages[lang] = evt.target.value;
                        this.setState({ languages: languages });
                      }}
                    />
                  </GridCell>
                ))
              ) : (
                <p>Please add languages to your config.yml first</p>
              )}
            </GridInner>
          </GridCell>*/}
        </Grid>
      </div>
    );
  }
}

export default TextItem;
