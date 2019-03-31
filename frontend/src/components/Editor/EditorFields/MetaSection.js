import React, { Component } from "react";
import TagsField from "./TagsField";

export class MetaSection extends Component {
  render() {
    return (
      <>
        <TagsField id={this.props.id} />
      </>
    );
  }
}

export default MetaSection;
