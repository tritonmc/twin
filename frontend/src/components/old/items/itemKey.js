import React, { PureComponent } from "react";
import { TextField, TextFieldHelperText } from "@rmwc/textfield";
import { GridCell } from "@rmwc/grid";
import { changeItemField } from "../../actions/items";
import { connect } from "react-redux";
import { Map } from "immutable";

class ItemKey extends PureComponent {
  constructor() {
    super();
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(evt) {
    this.props.changeItemField("key", this.props.id, evt.target.value);
  }

  render() {
    var { langKey, sign, bungee } = this.props;
    return (
      <GridCell desktop={sign || !bungee ? "12" : "6"} phone="4" tablet="8">
        <TextField
          style={{ width: "100%" }}
          defaultValue={langKey}
          onBlur={this.onBlur}
          withLeadingIcon="vpn_key"
          label={sign ? "Sign Key" : "Item Key"}
        />
        <TextFieldHelperText>
          {"This is a Unique Identifier of this " +
            (sign
              ? "sign. It will be used in-game to create new signs."
              : "item. It will be used in-game to get the correct text.")}
        </TextFieldHelperText>
      </GridCell>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  var id = ownProps.id;
  var item = store.items.getIn(["data", "present", id], Map());
  return {
    langKey: item.get("key"),
    bungee: store.items.get("bungee", false),
  };
};

const mapDispatchToProps = {
  changeItemField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemKey);
