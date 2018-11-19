import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { changeItemText } from "../../actions/items";
import { connect } from "react-redux";

class ItemLanguages extends PureComponent {
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

const LanguageText = connect((state, ownProps) => ({
  value: state.items.getIn(["data", "present", ownProps.id, "languages", ownProps.lang], ""),
}))(
  class LanguageText extends PureComponent {
    constructor() {
      super();
      this.onBlur = this.onBlur.bind(this);
    }

    onBlur(evt) {
      this.props.dispatch(changeItemText(this.props.id, this.props.lang, evt.target.value));
    }

    render() {
      return (
        <GridCell phone="4" tablet="8" desktop="12">
          <TextField
            style={{ width: "100%" }}
            label={this.props.lang}
            defaultValue={this.props.value}
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

export default connect(mapStateToProps)(ItemLanguages);
