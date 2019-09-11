import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import VpnIcon from "@material-ui/icons/VpnKey";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateField } from "../../../actions/items";

class KeyField extends Component {
  render() {
    return (
      <TextField
        id="editor-item-key"
        label="Item Key"
        defaultValue={this.props.itemKey}
        key={this.props.itemKey}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyField);
