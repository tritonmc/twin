import React from "react";
import DescriptionField from "./DescriptionField";
import TagsField from "./TagsField";

const MetaSection = ({ index }) => {
  return (
    <>
      <TagsField index={index} />
      <DescriptionField index={index} />
    </>
  );
};

export default MetaSection;
