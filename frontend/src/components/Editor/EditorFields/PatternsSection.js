import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/styles";
import { List } from "immutable";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PatternField from "./PatternField";
import { updateField, addPattern, deletePattern } from "../../../actions/items";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PatternsSection = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const patterns = useSelector((state) => {
    const item = state.items.get("present").find((item) => item.getIn(["_twin", "id"]) === id);
    return item ? item.get("patterns", List()) : List();
  });

  const onAdd = () => dispatch(addPattern(id));

  const onUpdate = (index) => (event) =>
    dispatch(updateField(id, ["patterns", index], event.target.value));
  const onDelete = (index) => () => dispatch(deletePattern(id, index));

  return (
    <div className={classes.root}>
      {patterns.map((v, i) => (
        <PatternField key={v} value={v} onUpdate={onUpdate(i)} onDelete={onDelete(i)} />
      ))}
      <Button color="primary" className={classes.button} onClick={onAdd}>
        <AddCircleOutlineIcon className={classes.leftIcon} />
        Add pattern
      </Button>
    </div>
  );
};

export default PatternsSection;
