import React, { PureComponent } from "react";
import { Checkbox } from "@rmwc/checkbox";
import { changeItemBlacklist } from "../../actions/items";
import { connect } from "react-redux";
import { GridCell } from "@rmwc/grid";

class ItemBlacklist extends PureComponent {
  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell phone="4" tablet="4" desktop="4">
        <Checkbox
          checked={this.props.value || false}
          onChange={(evt) => dispatch(changeItemBlacklist(langKey, evt.target.checked))}>
          <strong>Use Server List as Blacklist</strong>
        </Checkbox>
      </GridCell>
    );
  }
}

export default connect()(ItemBlacklist);
