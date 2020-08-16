import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { is, List } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";
import { openEditor, toggleSelected } from "../../../actions/editor";
import classnames from "classnames";
import ArchivedIcon from "@material-ui/icons/ArchiveRounded";
import CopyIcon from "mdi-material-ui/ClipboardText";
import IconButton from "@material-ui/core/IconButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withSnackbar } from "notistack";

const styles = (theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
  itemText: {
    display: "flex",
  },
  title: {
    width: "25%",
    paddingRight: 5,
    display: "flex",
  },
  titleText: {
    minWidth: 0,
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
    borderRadius: 4,
    marginRight: 6,
  },
  chipLabel: {
    border: "none",
    height: "100%",
    borderRadius: 4,
    boxSizing: "border-box",
    padding: "0 4px",
    lineHeight: "24px",
  },
  checkbox: {
    marginLeft: -12,
    marginRight: 6,
  },
  copyButton: {
    marginLeft: 6,
    opacity: 0.2,
    "&:hover": {
      opacity: 1,
    },
  },
});

class ItemRow extends Component {
  constructor() {
    super();
    this.openEditor = this.openEditor.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }

  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.id !== this.props.id ||
      nextProps.classes !== this.props.classes ||
      nextProps.index !== this.props.index ||
      !is(this.props.tags, nextProps.tags) ||
      nextProps.title !== this.props.title ||
      nextProps.description !== this.props.description ||
      nextProps.selected !== this.props.selected ||
      nextProps.collection !== this.props.collection ||
      nextProps.archived !== this.props.archived
    );
  };

  openEditor() {
    this.props.openEditor(this.props.id);
  }

  toggleSelected() {
    this.props.toggleSelected(this.props.id);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  onCopy(e) {
    e.stopPropagation();
    this.props.enqueueSnackbar("Copied to clipboard!", { variant: "info", autoHideDuration: 1000 });
  }

  render() {
    const { style, title, description, tags, classes, selected, collection, archived } = this.props;
    const argsCopySyntax = Array(((description || "").match(/%\d/g) || []).length)
      .fill("[arg][/arg]")
      .join("");
    const copySyntax = `[lang]${title || ""}${
      argsCopySyntax ? `[args]${argsCopySyntax}[/args]` : ``
    }[/lang]`;
    return (
      <ListItem
        button
        style={style}
        className={classnames(classes.root, { [classes.primaryColor]: selected })}
        onClick={this.openEditor}
        selected={selected}>
        <Checkbox
          className={classes.checkbox}
          checked={selected}
          onClick={this.stopPropagation}
          onChange={this.toggleSelected}
          color="primary"
        />
        <ListItemText disableTypography className={classes.itemText}>
          <div className={classes.title}>
            <div className={classes.titleText}>
              <Typography noWrap>{title || "Unknown key"}</Typography>
            </div>
            <CopyToClipboard text={copySyntax}>
              <IconButton size="small" className={classes.copyButton} onClick={this.onCopy}>
                <CopyIcon />
              </IconButton>
            </CopyToClipboard>
          </div>
          <div className={classes.description}>
            {archived && (
              <Chip
                className={classes.chip}
                classes={{ label: classes.chipLabel }}
                label={<ArchivedIcon />}
                size="small"
              />
            )}
            {collection !== "default" && (
              <Chip
                className={classes.chip}
                classes={{ label: classes.chipLabel }}
                label={collection}
                color="primary"
                size="small"
              />
            )}
            {tags.map((tag) => (
              <Chip
                className={classes.chip}
                classes={{ label: classes.chipLabel }}
                key={tag}
                label={tag}
                color="secondary"
                size="small"
              />
            ))}
            <Typography noWrap className={classes.descriptionText}>
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
    archived: item.getIn(["_twin", "archived"], false),
    selected: state.editor.get("selected").includes(id),
    collection: item.get("fileName", "default"),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openEditor: (id) => dispatch(openEditor(id)),
  toggleSelected: (id) => dispatch(toggleSelected(id)),
});

export default withSnackbar(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemRow))
);
