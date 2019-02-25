import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { List } from "immutable";

const styles = (theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
  itemText: {
    display: "flex",
  },
  title: {
    width: 200,
  },
  description: {
    flexGrow: 1,
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
  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.id !== this.props.id ||
      nextProps.classes !== this.props.classes ||
      nextProps.index !== this.props.index
    );
  };

  render() {
    const { style, title, description, tags, classes } = this.props;
    return (
      <ListItem button style={style} className={classes.root}>
        <Checkbox checked={false} tabIndex={-1} disableRipple />
        <ListItemText disableTypography className={classes.itemText}>
          <div className={classes.title}>
            <Typography inline noWrap>
              {title || "Unknown key"}
            </Typography>
          </div>
          <div className={classes.description}>
            {tags.map((tag) => (
              <Chip
                className={classes.chip}
                classes={{ label: classes.chipLabel }}
                key={tag}
                label={tag}
              />
            ))}
            <Typography inline noWrap>
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
        ? item.getIn(["lines", state.editor.get("previewLanguage")]).join(", ")
        : item.getIn(["languages", state.editor.get("previewLanguage")]),
    tags: item.getIn(["_twin", "tags"], List()),
  };
};

export default withStyles(styles)(connect(mapStateToProps)(ItemRow));
