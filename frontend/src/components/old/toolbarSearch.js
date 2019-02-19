import React from "react";
import { connect } from "react-redux";
import { TextField, TextFieldIcon } from "@rmwc/textfield";
import { setSearch } from "../actions/navigation";

class ToolbarSearch extends React.PureComponent {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  onChange(evt) {
    this.props.setSearch(evt ? evt.target.value : "");
  }

  clearSearch() {
    this.props.setSearch("");
  }

  render() {
    return (
      <div className="toolbar-bottom">
        <TextField
          className="searchbar"
          outlined
          label="Search"
          withLeadingIcon="search"
          value={this.props.search}
          onChange={this.onChange}
          withTrailingIcon={<TextFieldIcon tabIndex="0" icon="close" onClick={this.clearSearch} />}
        />
      </div>
    );
  }
}

var mapStateToProps = (state) => ({ search: state.navigation.get("search") });
var mapDispatchToProps = { setSearch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarSearch);
