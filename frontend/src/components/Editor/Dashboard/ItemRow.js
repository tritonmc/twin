import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { is, List } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";
import { openEditor } from "../../../actions/editor";

const styles = (theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
  itemText: {
    display: "flex",
  },
  title: {
    width: "25%",
  },
  description: {
    flexGrow: 1,
    display: "flex",
    minWidth: 0,
  },
  descriptionText: {
    flex: "1 1 auto",
    width: 0,
  },
  chip: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    height: "100%",
    borderRadius: 4,
    boxSizing: "border-box",
    marginRight: 6,
    color: theme.palette.secondary.contrastText,
  },
  chipLabel: {
    border: "none",
    height: "100%",
    borderRadius: 4,
    boxSizing: "border-box",
    padding: "0 4px",
  },
});

class ItemRow extends Component {
  constructor() {
    super();
    this.openEditor = this.openEditor.bind(this);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.id !== this.props.id ||
      nextProps.classes !== this.props.classes ||
      nextProps.index !== this.props.index ||
      !is(this.props.tags, nextProps.tags) ||
      nextProps.title !== this.props.title ||
      nextProps.description !== this.props.description
    );
  };

  openEditor() {
    this.props.openEditor(this.props.id);
  }

  render() {
    const { style, title, description, tags, classes } = this.props;
    return (
      <ListItem button style={style} className={classes.root} onClick={this.openEditor}>
        <Checkbox checked={false} tabIndex={-1} disableRipple />
        <ListItemText disableTypography className={classes.itemText}>
          <Typography inline noWrap component="div" className={classes.title}>
            {title || "Unknown key"}
          </Typography>
          <div className={classes.description}>
            {tags.map((tag) => (
              <Chip
                className={classes.chip}
                classes={{ label: classes.chipLabel }}
                key={tag}
                label={tag}
              />
            ))}
            <Typography inline noWrap className={classes.descriptionText}>
              {description}
            </Typography>
          </div>
        </ListItemText>
      </ListItem>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  var id = ownProps.data.get(ownProps.index);
  var item = state.items.get("present").find((obj) => obj.getIn(["_twin", "id"]) === id);
  return {
    id,
    title: item.get("key"),
    description:
      item.get("type", "") === "sign"
        ? item.getIn(["lines", state.editor.get("previewLanguage")], List()).join(", ")
        : item.getIn(["languages", state.editor.get("previewLanguage")], ""),
    tags: item.getIn(["_twin", "tags"], List()),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openEditor: (id) => dispatch(openEditor(id)),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemRow)
);
