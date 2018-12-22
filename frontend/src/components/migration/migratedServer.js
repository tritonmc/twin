import React from "react";
import { TextField } from "@rmwc/textfield";
import { IconButton } from "@rmwc/icon-button";

class MigratedServer extends React.PureComponent {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onNameChange(evt) {
    this.props.callback(this.props.id, "name", evt.target.value);
  }

  onContentChange(evt) {
    this.props.callback(this.props.id, "content", evt.target.value);
  }

  onDeleteClick() {
    this.props.delete(this.props.id);
  }

  render() {
    return (
      <div>
        <TextField label="Server name" value={this.props.name} onChange={this.onNameChange} />
        <IconButton icon="delete" label="Delete server!" onClick={this.onDeleteClick} />
        <TextField
          textarea
          fullwidth
          label="languages.json content"
          rows="8"
          value={this.props.content}
          onChange={this.onContentChange}
        />
      </div>
    );
  }
}

export default MigratedServer;
