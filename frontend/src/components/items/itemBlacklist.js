import React, { PureComponent } from "react";
import { Checkbox } from "@rmwc/checkbox";
import { changeItemField } from "../../actions/items";
import { connect } from "react-redux";
import { GridCell } from "@rmwc/grid";
import { Map } from "immutable";

class ItemBlacklist extends PureComponent {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.props.changeItemField("blacklist", this.props.id, evt.target.checked);
  }
  render() {
    var { bungee } = this.props;
    if (!bungee) return null;
    return (
      <GridCell phone="4" tablet="4" desktop="4">
        <Checkbox checked={this.props.value || false} onChange={this.onChange}>
          <strong>Use Server List as Blacklist</strong>
        </Checkbox>
      </GridCell>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  var id = ownProps.id;
  var item = store.items.getIn(["data", "present", id], Map());
  return {
    value: item.get("blacklist"),
    bungee: store.items.get("bungee", false),
  };
};

const mapDispatchToProps = {
  changeItemField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemBlacklist);
