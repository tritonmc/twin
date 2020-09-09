import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/styles";
import { List } from "immutable";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPattern, deletePattern, updateField } from "../../../actions/items";
import PatternField from "./PatternField";

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

const PatternsSection = ({ index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const patterns = useSelector((state) =>
    state.items.getIn(["present", index, "patterns"], List())
  );

  const onAdd = useCallback(() => dispatch(addPattern(index)), [dispatch, index]);
  const onUpdate = useCallback(
    (patternIndex) => (event) =>
      dispatch(updateField(index, ["patterns", patternIndex], event.target.value)),
    [dispatch, index]
  );
  const onDelete = useCallback(
    (patternIndex) => () => dispatch(deletePattern(index, patternIndex)),
    [dispatch, index]
  );

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
