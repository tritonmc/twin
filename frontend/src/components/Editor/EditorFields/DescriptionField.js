import React, { Component } from "react";
import { connect } from "react-redux";
import { updateField } from "../../../actions/items";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class KeyField extends Component {
  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="editor-item-description"
        label="Description"
        className={classes.textField}
        value={this.props.itemDescription}
        onChange={this.props.updateField}
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id);
  return {
    itemDescription: item ? item.getIn(["_twin", "description"]) : "",
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (evt) =>
    dispatch(updateField(ownProps.id, ["_twin", "description"], evt.target.value)),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KeyField)
);
