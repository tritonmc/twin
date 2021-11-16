import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const LanguageField = ({ updateField, value, language }) => {
  const classes = useStyles();

  const handleChange = (evt) => updateField(language, evt.target.value);

  return (
    <TextField
      id={"editor-language-field-" + language}
      label={language}
      className={classes.textField}
      defaultValue={value || ""}
      placeholder={value === null ? "Using translation from the default language" : undefined}
      InputLabelProps={{
        shrink: true,
      }}
      onBlur={handleChange}
      margin="normal"
      variant="outlined"
      fullWidth
      multiline
    />
  );
};

export default LanguageField;
