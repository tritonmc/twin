import React, { Component } from "react";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Grid, GridCell, GridInner } from "@rmwc/grid";
import { Checkbox } from "@rmwc/checkbox";
import { IconButton } from "@rmwc/icon-button";

class TextItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.langKey,
      universal: this.props.universal,
      blacklist: this.props.blacklist,
      description: this.props.description,
      tags: this.props.tags || [],
      tagInput: "",
      tagValidationMsg: undefined,
    };
  }

  render() {
    return (
      <div className="language-item text-item">
        <Grid>
          <GridCell desktop="6" phone="4" tablet="8">
            <TextField
              style={{ width: "100%" }}
              value={this.state.key}
              onChange={(evt) => {
                this.setState({ key: evt.target.value });
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
              checked={this.state.universal || false}
              onChange={(evt) => this.setState({ universal: evt.target.checked })}>
              <strong>Universal</strong>
            </Checkbox>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop="4">
            <Checkbox
              checked={this.state.blacklist || false}
              onChange={(evt) => this.setState({ blacklist: evt.target.checked })}>
              <strong>Use Server List as Blacklist</strong>
            </Checkbox>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop="12">
            <TextField
              textarea
              value={this.state.description}
              onChange={(evt) => {
                this.setState({ description: evt.target.value });
              }}
              label="Description"
            />
            <TextFieldHelperText>
              Use this if you want to store any information on the item. This is not used by the
              plugin.
            </TextFieldHelperText>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop="6">
            <GridInner>
              <span style={{ fontSize: "1.5em" }}>Tags</span>
              {this.state.tags &&
                this.state.tags.map((tag) => (
                  <GridCell key={tag} phone="4" tablet="8" desktop="12" className="tag-cell">
                    <span>{tag}</span>
                    <IconButton icon="delete_forever" />
                  </GridCell>
                ))}
              <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
                <div className="mdc-text-field-wrapper">
                  <TextField
                    dense
                    label="Add a new tag"
                    value={this.state.tagInput}
                    onChange={(evt) => {
                      this.setState({ tagInput: evt.target.value });
                    }}
                  />
                  {this.state.tagValidationMsg && (
                    <TextFieldHelperText persistent>
                      {this.state.tagValidationMsg}
                    </TextFieldHelperText>
                  )}
                </div>
                <IconButton
                  icon="add_circle"
                  onClick={() => {
                    if (!this.state.tagInput) {
                      this.setState({
                        tagValidationMsg: "You can't add an empty tag!",
                      });
                      return;
                    }
                    if (this.state.tags.includes(this.state.tagInput)) {
                      this.setState({
                        tagValidationMsg: "Tag already exists!",
                      });
                      return;
                    }
                    var tags = this.state.tags.slice();
                    tags.push(this.state.tagInput);
                    this.setState({
                      tagInput: "",
                      tags: tags,
                    });
                  }}
                />
              </GridCell>
            </GridInner>
          </GridCell>
        </Grid>
        <p>{"Servers" + this.props.servers}</p>
        <p>Tags {this.props.tags}</p>
        <p>Languages</p>
        {Object.keys(this.props.languages).map((lang) => (
          <p key={lang}>{" " + this.props.languages[lang]}</p>
        ))}
      </div>
    );
  }
}

export default TextItem;
