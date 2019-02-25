import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

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
});

class ItemRow extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      !this.props.data.get(this.props.index).equals(nextProps.data.get(nextProps.index)) ||
      this.props.classes != nextProps.classes
    );
  };

  render() {
    const { index, style, data, classes } = this.props;
    const item = data.get(index);
    return (
      <ListItem button style={style} className={classes.root}>
        <Checkbox checked={false} tabIndex={-1} disableRipple />
        <ListItemText disableTypography className={classes.itemText}>
          <div className={classes.title}>
            <Typography inline noWrap>
              {item.get("title", "Unknown key")}
            </Typography>
          </div>
          <div className={classes.description}>
            <Typography inline noWrap>
              {item.get("description", "")}
            </Typography>
          </div>
        </ListItemText>
      </ListItem>
    );
  }
}

export default withStyles(styles)(ItemRow);
