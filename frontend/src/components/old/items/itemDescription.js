import React, { PureComponent } from "react";
import { TextField, TextFieldHelperText } from "@rmwc/textfield";
import { changeItemField } from "../../actions/items";
import { connect } from "react-redux";
import { GridCell } from "@rmwc/grid";
import { Map } from "immutable";

class ItemDescription extends PureComponent {
  constructor() {
    super();
    this.onBlur = this.onBlur.bind(this);
  }
  onBlur(evt) {
    this.props.changeItemField("description", this.props.id, evt.target.value);
  }
  render() {
    return (
      <GridCell phone="4" tablet="8" desktop="12">
        <TextField
          textarea
          defaultValue={this.props.value}
          onBlur={this.onBlur}
          label="Description"
        />
        <TextFieldHelperText>
          Use this if you want to store some information about the item. This is not used by the
          plugin.
        </TextFieldHelperText>
      </GridCell>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  var id = ownProps.id;
  var item = store.items.getIn(["data", "present", id], Map());
  return {
    value: item.get("description"),
  };
};

const mapDispatchToProps = {
  changeItemField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDescription);
