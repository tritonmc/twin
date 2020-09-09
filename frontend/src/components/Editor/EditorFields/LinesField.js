import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const LineField = ({ updateField, language, value, line }) => {
  const handleChange = (evt) => updateField(language, line, evt.target.value);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        id={"editor-language-field-" + language + "-" + line}
        label={"Line " + (line + 1)}
        defaultValue={value}
        key={value}
        onBlur={handleChange}
        margin="normal"
        variant="outlined"
        fullWidth
      />
    </Grid>
  );
};

const LinesField = ({ language, value, updateField }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="subtitle1">{language}</Typography>
      <Grid container spacing={2} className={classes.textField}>
        <LineField
          line={0}
          language={language}
          updateField={updateField}
          value={value.get(0, "")}
        />
        <LineField
          line={1}
          language={language}
          updateField={updateField}
          value={value.get(1, "")}
        />
        <LineField
          line={2}
          language={language}
          updateField={updateField}
          value={value.get(2, "")}
        />
        <LineField
          line={3}
          language={language}
          updateField={updateField}
          value={value.get(3, "")}
        />
      </Grid>
    </>
  );
};

export default LinesField;
