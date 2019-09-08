import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { setAllSelected } from "../../../actions/editor";

const useStyles = makeStyles({
  root: {
    height: 36,
  },
  itemText: {
    display: "flex",
  },
  title: {
    width: "25%",
  },
  description: {
    flexGrow: 1,
    minWidth: 0,
  },
  checkbox: {
    marginLeft: -12,
    marginRight: 6,
  },
});

const SelectionToolbar = ({ visibleItems }) => {
  const classes = useStyles();
  const { checked, indeterminate } = useSelector((state) => {
    var selected = state.editor.get("selected");
    if (selected.isSuperset(visibleItems)) return { checked: true, indeterminate: false };
    if (selected.some((v) => visibleItems.indexOf(v) !== -1))
      return { checked: false, indeterminate: true };
    return { checked: false, indeterminate: false };
  });
  const dispatch = useDispatch();
  const onChange = () => dispatch(setAllSelected(checked === indeterminate, visibleItems));
  return (
    <>
      <ListItem className={classes.root}>
        <Checkbox
          className={classes.checkbox}
          checked={checked}
          indeterminate={indeterminate}
          color="primary"
          onChange={onChange}
        />
        <ListItemText>
          <ListItemText disableTypography className={classes.itemText}>
            <Typography
              noWrap
              component="div"
              variant="subtitle2"
              color="textSecondary"
              className={classes.title}>
              Key
            </Typography>
            <Typography
              noWrap
              component="div"
              variant="subtitle2"
              color="textSecondary"
              className={classes.description}>
              Content
            </Typography>
          </ListItemText>
        </ListItemText>
      </ListItem>
      <Divider />
    </>
  );
};

export default SelectionToolbar;
