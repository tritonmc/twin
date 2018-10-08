import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { IconButton } from "@rmwc/icon-button";
import { addItemTag, removeItemTag } from "../../actions/items";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";

class ItemTags extends PureComponent {
  constructor(props) {
    super(props);
    this.tagInput = React.createRef();
    this.onTagAddClick = this.onTagAddClick.bind(this);
  }

  render() {
    var { dispatch, langKey } = this.props;
    return (
      <GridCell
        phone="4"
        tablet={this.props.universal === true ? "8" : "4"}
        desktop={this.props.universal === true ? "12" : "6"}>
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Tags</span>
          {this.props.tags &&
            this.props.tags.map((tag) => (
              <GridCell key={tag} phone="4" tablet="8" desktop="12" className="tag-cell">
                <span>{tag}</span>
                <IconButton
                  icon="delete_forever"
                  onClick={() => {
                    dispatch(removeItemTag(langKey, tag));
                  }}
                />
              </GridCell>
            ))}
          <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
            <div className="mdc-text-field-wrapper">
              <TextField dense label="Add a new tag" ref={this.tagInput} />
            </div>
            <TagAddButton onClick={this.onTagAddClick} />
          </GridCell>
        </GridInner>
      </GridCell>
    );
  }
  onTagAddClick() {
    var { dispatch, langKey } = this.props;
    if (!this.tagInput || !this.tagInput.current.value) {
      dispatch(
        showSnack("", {
          label: "You can't add an empty tag!",
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
      return;
    }
    if (this.props.tags.includes(this.tagInput.current.value)) {
      dispatch(
        showSnack("", {
          label: "Tag already exists!",
          timeout: 7000,
          button: { label: "OK, GOT IT" },
        })
      );
      return;
    }
    dispatch(addItemTag(langKey, this.tagInput.current.value));
    this.tagInput.current.value = "";
  }
}

class TagAddButton extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    var { onClick } = this.props;
    return <IconButton icon="add_circle" onClick={onClick} />;
  }
}

export default connect()(ItemTags);
