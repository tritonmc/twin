import { Alert } from "@material-ui/lab";
import { useEditorSettings } from "hooks/useEditorSettings";
import { List, Map, Set } from "immutable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, updateSignLine } from "../../../actions/items";
import LanguageField from "./LanguageField";
import LinesField from "./LinesField";
import { Grid } from "@material-ui/core";

const TextFieldsSection = ({ index }) => {
  const { languages } = useEditorSettings();
  const dispatch = useDispatch();
  const { type, content } = useSelector((state) => {
    const item = state.items.getIn(["present", index], Map());
    const type = item.get("type", "text");
    return { type, content: item.get(type === "text" ? "languages" : "lines", Map()) };
  });

  const updateTextValue = (language, value) =>
    dispatch(updateField(index, ["languages", language], value));
  const updateSignValue = (language, line, value) =>
    dispatch(updateSignLine(index, language, parseInt(line), value));

  let keys = Set();
  languages.forEach((v) => (keys = keys.add(v)));
  content.keySeq().forEach((v) => (keys = keys.add(v)));
  keys = keys.sort();

  if (keys.size === 0)
    return (
      <Grid item xs={12}>
        <Alert severity="warning">
          There are no languages available. Please add them in your <code>config.yml</code> and try
          again.
        </Alert>
      </Grid>
    );

  if (type === "text")
    return keys.map((language) => (
      <LanguageField
        key={language}
        language={language}
        value={content.get(language, "")}
        updateField={updateTextValue}
      />
    ));

  if (type === "sign")
    return keys.map((language) => (
      <LinesField
        key={language}
        language={language}
        value={content.get(language, List())}
        updateField={updateSignValue}
      />
    ));

  return (
    <Grid item xs={12}>
      <Alert severity="error">An error occurred. Unknown item type.</Alert>
    </Grid>
  );
};

export default TextFieldsSection;
