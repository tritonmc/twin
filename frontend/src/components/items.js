import React, { Component } from "react";
import { TextField, TextFieldIcon, TextFieldHelperText } from "@rmwc/textfield";
import { Button } from "@rmwc/button";

class TextItem extends Component {
  render() {
    return (
      <div className="language-item text-item">
        <TextField withLeadingIcon="vpn_key" box label="Item Key" />
        <TextFieldHelperText>
          This is a Unique Identifier of this item. It will be used in-game to get correct text.
        </TextFieldHelperText>
        <p>{"Key " + this.props.langKey}</p>
        <p>Description {this.props.description}</p>
        <p>{"Universal " + this.props.universal}</p>
        <p>{"Servers" + this.props.servers}</p>
        <p>Blacklist {this.props.blacklist}</p>
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
