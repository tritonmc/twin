import React, { Component } from "react";
import TagsField from "./TagsField";
import DescriptionField from "./DescriptionField";

export class MetaSection extends Component {
  render() {
    return (
      <>
        <TagsField id={this.props.id} />
        <DescriptionField id={this.props.id} />
      </>
    );
  }
}

export default MetaSection;
