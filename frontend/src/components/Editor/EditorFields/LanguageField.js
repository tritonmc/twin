import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

class LanguageField extends Component {
  updateField = (evt) => {
    this.props.updateField(this.props.language, evt.target.value);
  };

  render() {
    const { classes, language, value } = this.props;
    return (
      <TextField
        id={"editor-language-field-" + language}
        label={language}
        className={classes.textField}
        defaultValue={value}
        key={value}
        onBlur={this.updateField}
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
      />
    );
  }
}

export default withStyles(styles)(LanguageField);
