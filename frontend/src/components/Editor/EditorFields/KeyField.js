import React, { Component } from "react";
import { connect } from "react-redux";
import { updateField } from "../../../actions/items";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import VpnIcon from "@material-ui/icons/VpnKey";

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
        id="editor-item-key"
        label="Item Key"
        className={classes.textField}
        value={this.props.itemKey}
        onBlur={this.props.updateField}
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id);
  return {
    itemKey: item ? item.get("key") : "",
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (evt) => dispatch(updateField(ownProps.id, ["key"], evt.target.value)),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KeyField)
);
