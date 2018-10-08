import React, { PureComponent } from "react";
import { TextField, TextFieldHelperText } from "@rmwc/textfield";
import { changeItemDescription } from "../../actions/items";
import { connect } from "react-redux";
import { GridCell } from "@rmwc/grid";

class ItemDescription extends PureComponent {
  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell phone="4" tablet="8" desktop="12">
        <TextField
          textarea
          defaultValue={this.props.value}
          onBlur={(evt) => {
            dispatch(changeItemDescription(langKey, evt.target.value));
          }}
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

export default connect()(ItemDescription);
