import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, List, Set } from "immutable";
import LanguageField from "./LanguageField";
import { updateField, updateSignLine } from "../../../actions/items";
import LinesField from "./LinesField";
import Typography from "@material-ui/core/Typography";

export class TextFieldsSection extends Component {
  render() {
    const { type, languages, availableLanguages } = this.props;
    var keys = Set();
    availableLanguages.forEach((v) => (keys = keys.add(v)));
    languages.keySeq().forEach((v) => (keys = keys.add(v)));
    if (keys.size === 0) {
      return (
        <Typography color="error" variant="body2">
          There are no languages available. Please add them in your <code>config.yml</code> and try
          again.
        </Typography>
      );
    } else if (type === "text") {
      return (
        <>
          {keys.map((language) => (
            <LanguageField
              key={language}
              language={language}
              value={languages.get(language, "")}
              updateField={this.props.updateLanguage}
            />
          ))}
        </>
      );
    } else if (type === "sign") {
      return (
        <>
          {keys.map((language) => (
            <LinesField
              key={language}
              language={language}
              value={languages.get(language, List())}
              updateField={this.props.updateLine}
            />
          ))}
        </>
      );
    } else {
      return (
        <Typography color="error" variant="body2">
          An error occurred. Unknown item type.
        </Typography>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id, undefined, Map());
  const type = item.get("type", "text");
  return {
    type,
    languages: item.get(type === "text" ? "languages" : "lines", Map()),
    availableLanguages: state.main.get("availableLanguages", List()),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateLanguage: (language, value) =>
    dispatch(updateField(ownProps.id, ["languages", language], value)),
  updateLine: (language, line, value) =>
    dispatch(updateSignLine(ownProps.id, language, parseInt(line), value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextFieldsSection);
