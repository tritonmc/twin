import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { changeItemText } from "../../actions/items";
import { connect } from "react-redux";

class ItemLanguages extends PureComponent {
  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell phone="4" tablet="8" desktop="12">
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Text</span>
          {this.props.availableLanguages ? (
            this.props.availableLanguages.map((lang) => (
              <LanguageText
                key={lang}
                langKey={langKey}
                dispatch={dispatch}
                lang={lang}
                value={this.props.languages && this.props.languages.get(lang)}
              />
            ))
          ) : (
            <p>Please add languages to your config.yml first.</p>
          )}
        </GridInner>
      </GridCell>
    );
  }
}

class LanguageText extends PureComponent {
  render() {
    return (
      <GridCell key={this.props.lang} phone="4" tablet="8" desktop="12">
        <TextField
          outlined
          style={{ width: "100%" }}
          label={this.props.lang}
          defaultValue={this.props.value}
          onBlur={(evt) => {
            this.props.dispatch(
              changeItemText(this.props.langKey, this.props.lang, evt.target.value)
            );
          }}
        />
      </GridCell>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    availableLanguages: state.items.itemListRoot.get("availableLanguages"),
  };
};

export default connect(mapStateToProps)(ItemLanguages);
