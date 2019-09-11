import React, { Component } from "react";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { updateField } from "../../../actions/items";

class CheckboxField extends Component {
  render() {
    const { path, label, value, updateField } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={updateField}
            value={"editor-item-" + path}
            color="primary"
          />
        }
        label={label}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const defaultValue = ownProps.default || false;
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id);
  return {
    value: item ? item.get(ownProps.path, defaultValue) : defaultValue,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (evt) => dispatch(updateField(ownProps.id, [ownProps.path], evt.target.checked)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxField);
