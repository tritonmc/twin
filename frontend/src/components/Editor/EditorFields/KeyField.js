import { InputAdornment, TextField } from "@material-ui/core";
import VpnIcon from "@material-ui/icons/VpnKey";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../actions/items";

const KeyField = ({ index }) => {
  const value = useSelector((state) => state.items.getIn(["present", index, "key"]));
  const dispatch = useDispatch();

  const updateValue = useCallback(
    (evt) => dispatch(updateField(index, ["key"], evt.target.value)),
    [dispatch, index]
  );

  return (
    <TextField
      id="editor-item-key"
      label="Item Key"
      defaultValue={value}
      // Use key here so it updates on undo/redo
      key={value}
      onBlur={updateValue}
      margin="normal"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <VpnIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default KeyField;
