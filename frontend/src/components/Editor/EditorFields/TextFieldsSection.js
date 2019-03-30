import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import LanguageField from "./LanguageField";
import { updateField } from "../../../actions/items";

export class TextFieldsSection extends Component {
  render() {
    const { type, languages } = this.props;
    if (type === "text") {
      var result = [];
      languages.forEach((value, language) => {
        result.push(
          <LanguageField
            key={language}
            language={language}
            value={value}
            updateField={this.props.updateField}
          />
        );
      });
      return <>{result}</>;
    }
    return (
      <>
        <LanguageField
          language="en_GB"
          value={this.props.languages.get("en_GB", "")}
          updateField={this.props.updateField}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id);
  const type = item.get("type", "text");
  return {
    type,
    languages: item.get(type === "text" ? "languages" : "lines", Map()),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (language, value) =>
    dispatch(updateField(ownProps.id, ["languages", language], value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextFieldsSection);
