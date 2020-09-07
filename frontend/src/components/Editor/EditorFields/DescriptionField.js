import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../actions/items";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const DescriptionField = ({ index }) => {
  const classes = useStyles();
  const value = useSelector((state) =>
    state.items.getIn(["present", index, "_twin", "description"])
  );
  const dispatch = useDispatch();

  const updateValue = useCallback(
    (evt) => dispatch(updateField(index, ["_twin", "description"], evt.target.value)),
    [dispatch, index]
  );

  return (
    <TextField
      id="editor-item-description"
      label="Description"
      className={classes.textField}
      defaultValue={value}
      onBlur={updateValue}
      margin="normal"
      variant="outlined"
      fullWidth
      multiline
    />
  );
};

export default DescriptionField;
