import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { changeSignLine } from "../../actions/items";
import { connect } from "react-redux";
import { List } from "immutable";

class ItemLines extends PureComponent {
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
                value={(this.props.languages && this.props.languages.get(lang)) || List()}
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
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }
  onBlur(index, value) {
    this.props.dispatch(changeSignLine(this.props.langKey, this.props.lang, index, value));
  }
  render() {
    return (
      <GridCell key={this.props.lang} phone="4" tablet="8" desktop="12">
        <GridInner>
          <GridCell span="12">
            <span style={{ fontSize: "1.2em" }}>{this.props.lang}</span>
          </GridCell>
          <LanguageLine index={0} value={this.props.value.get(0)} onBlur={this.onBlur} />
          <LanguageLine index={1} value={this.props.value.get(1)} onBlur={this.onBlur} />
          <LanguageLine index={2} value={this.props.value.get(2)} onBlur={this.onBlur} />
          <LanguageLine index={3} value={this.props.value.get(3)} onBlur={this.onBlur} />
        </GridInner>
      </GridCell>
    );
  }
}

class LanguageLine extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }
  onBlur(evt) {
    this.props.onBlur(this.props.index, evt.target.value);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    var { index, value } = this.props;
    return (
      <GridCell phone="4" tablet="4" desktop="3">
        <TextField
          outlined
          style={{ width: "100%" }}
          label={"Line " + (index + 1)}
          defaultValue={value}
          onBlur={this.onBlur}
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

export default connect(mapStateToProps)(ItemLines);
