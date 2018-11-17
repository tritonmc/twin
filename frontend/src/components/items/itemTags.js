import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell, GridInner } from "@rmwc/grid";
import { IconButton } from "@rmwc/icon-button";
import { addItemTag, removeItemTag } from "../../actions/items";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";
import { Map, List } from "immutable";

class ItemTags extends PureComponent {
  constructor(props) {
    super(props);
    this.onTagRemoveClick = this.onTagRemoveClick.bind(this);
  }

  render() {
    var { dispatch, id, universal, bungee } = this.props;
    return (
      <GridCell
        phone="4"
        tablet={universal === true || !bungee ? "8" : "4"}
        desktop={universal === true || !bungee ? "12" : "6"}>
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Tags</span>
          {this.props.tags &&
            this.props.tags.map((tag) => (
              <TagItem key={tag} value={tag} onClick={this.onTagRemoveClick} />
            ))}
          <TagInput dispatch={dispatch} langKey={id} tags={this.props.tags} />
        </GridInner>
      </GridCell>
    );
  }
  onTagRemoveClick(value) {
    var { dispatch, id } = this.props;
    dispatch(removeItemTag(id, value));
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

class TagItem extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    var { onClick, value } = this.props;
    return (
      <GridCell phone="4" tablet="8" desktop="12" className="tag-cell">
        <span>{value}</span>
        <IconButton icon="delete_forever" onClick={() => onClick(value)} />
      </GridCell>
    );
  }
}

class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.tagInput = React.createRef();
    this.onTagAddClick = this.onTagAddClick.bind(this);
  }
  shouldComponentUpdate() {
    return false;
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
    if (this.props.tags && this.props.tags.includes(this.tagInput.current.value)) {
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
  render() {
    return (
      <GridCell phone="4" tablet="8" desktop="12" className="tag-cell tag-cell--input">
        <div className="mdc-text-field-wrapper">
          <TextField dense label="Add a new tag" ref={this.tagInput} />
        </div>
        <TagAddButton onClick={this.onTagAddClick} />
      </GridCell>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  var id = ownProps.id;
  var item = store.items.getIn(["data", "present", id], Map());
  return {
    tags: item.get("tags", List()),
    universal: item.get("universal", false),
    bungee: store.items.get("bungee", false),
  };
};

export default connect(mapStateToProps)(ItemTags);
