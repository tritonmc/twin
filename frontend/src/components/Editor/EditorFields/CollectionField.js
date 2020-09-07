import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../actions/items";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
}));

const CollectionField = ({ index }) => {
  const classes = useStyles();

  const { collection, collections } = useSelector((state) => ({
    collection: state.items.getIn(["present", index, "fileName"], "default"),
    collections: state.editor.get("metadata").keySeq().sort(),
  }));
  const dispatch = useDispatch();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (event) => dispatch(updateField(index, ["fileName"], event.target.value));
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="item-collection">
        Collection
      </InputLabel>
      <Select
        value={collection}
        onChange={handleChange}
        labelWidth={labelWidth}
        inputProps={{
          name: "collection",
          id: "item-collection",
        }}>
        {collections.map((v) => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CollectionField;
