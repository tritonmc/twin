import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../../actions/items";

const CheckboxField = ({ index, path, label, defaultOn = false }) => {
  const value = useSelector((state) => state.items.getIn(["present", index, path], defaultOn));
  const dispatch = useDispatch();
  const onChange = (evt) => dispatch(updateField(index, [path], evt.target.checked));

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={onChange}
          value={"editor-item-" + path}
          color="primary"
        />
      }
      label={label}
    />
  );
};

export default CheckboxField;
