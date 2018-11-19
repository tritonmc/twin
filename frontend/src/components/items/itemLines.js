import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { changeSignLine } from "../../actions/items";
import { connect } from "react-redux";

class ItemLines extends PureComponent {
  render() {
    var { id } = this.props;
    return (
      <GridCell phone="4" tablet="8" desktop="12">
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Text</span>
          {this.props.availableLanguages ? (
            this.props.availableLanguages.map((lang) => (
              <LanguageText key={lang} id={id} lang={lang} />
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
    var { id, lang } = this.props;
    return (
      <GridCell key={this.props.lang} phone="4" tablet="8" desktop="12">
        <GridInner>
          <GridCell span="12">
            <span style={{ fontSize: "1.2em" }}>{this.props.lang}</span>
          </GridCell>
          <LanguageLine index={0} id={id} lang={lang} />
          <LanguageLine index={1} id={id} lang={lang} />
          <LanguageLine index={2} id={id} lang={lang} />
          <LanguageLine index={3} id={id} lang={lang} />
        </GridInner>
      </GridCell>
    );
  }
}

const LanguageLine = connect((state, ownProps) => ({
  value: state.items.getIn(
    ["data", "present", ownProps.id, "lines", ownProps.lang, ownProps.index],
    ""
  ),
}))(
  class LanguageLine extends PureComponent {
    constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
    }
    onBlur(evt) {
      this.props.dispatch(
        changeSignLine(this.props.id, this.props.lang, this.props.index, evt.target.value)
      );
    }
    render() {
      var { index, value } = this.props;
      return (
        <GridCell phone="4" tablet="4" desktop="3">
          <TextField
            style={{ width: "100%" }}
            label={"Line " + (index + 1)}
            defaultValue={value}
            onBlur={this.onBlur}
          />
        </GridCell>
      );
    }
  }
);

const mapStateToProps = (state) => {
  return {
    availableLanguages: state.items.get("availableLanguages"),
  };
};

export default connect(mapStateToProps)(ItemLines);
