import React, { PureComponent } from "react";
import { TextField, TextFieldHelperText } from "@rmwc/textfield";
import { GridCell } from "@rmwc/grid";
import { changeItemKey } from "../../actions/items";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";

class ItemKey extends PureComponent {
  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell desktop="6" phone="4" tablet="8">
        <TextField
          style={{ width: "100%" }}
          defaultValue={langKey}
          onBlur={(evt) => {
            if (this.props.langKey === evt.target.value) return;
            if (!this.props.isDuplicateKey(evt.target.value))
              dispatch(changeItemKey(langKey, evt.target.value));
            else {
              dispatch(
                showSnack("", {
                  label: "Duplicate key! Please choose another one!",
                  timeout: 7000,
                  button: { label: "OK, GOT IT" },
                })
              );
              evt.target.value = langKey;
            }
          }}
          withLeadingIcon="vpn_key"
          label="Item Key"
        />
        <TextFieldHelperText>
          This is a Unique Identifier of this item. It will be used in-game to get the correct text.
        </TextFieldHelperText>
      </GridCell>
    );
  }
}

export default connect()(ItemKey);
