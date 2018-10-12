import React, { PureComponent } from "react";
import { Checkbox } from "@rmwc/checkbox";
import { changeItemUniversal } from "../../actions/items";
import { connect } from "react-redux";
import { GridCell } from "@rmwc/grid";

class ItemUniversal extends PureComponent {
  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell phone="4" tablet="4" desktop="2">
        <Checkbox
          checked={this.props.value || false}
          onChange={(evt) => dispatch(changeItemUniversal(langKey, evt.target.checked))}>
          <strong>Universal</strong>
        </Checkbox>
      </GridCell>
    );
  }
}

export default connect()(ItemUniversal);
