import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class LinesField extends Component {
  render() {
    const { classes, language, value } = this.props;
    return (
      <>
        <Typography variant="subtitle1">{language}</Typography>
        <Grid container spacing={16} className={classes.textField}>
          <LineField
            line={0}
            language={this.props.language}
            updateField={this.props.updateField}
            value={value.get(0, "")}
          />
          <LineField
            line={1}
            language={this.props.language}
            updateField={this.props.updateField}
            value={value.get(1, "")}
          />
          <LineField
            line={2}
            language={this.props.language}
            updateField={this.props.updateField}
            value={value.get(2, "")}
          />
          <LineField
            line={3}
            language={this.props.language}
            updateField={this.props.updateField}
            value={value.get(3, "")}
          />
        </Grid>
      </>
    );
  }
}

class LineField extends Component {
  updateField = (evt) => {
    this.props.updateField(this.props.language, this.props.line, evt.target.value);
  };

  render() {
    const { language, value, line } = this.props;
    return (
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          id={"editor-language-field-" + language + "-" + line}
          label={"Line " + (line + 1)}
          defaultValue={value}
          key={value}
          onBlur={this.updateField}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(LinesField);
