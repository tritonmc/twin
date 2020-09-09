import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useEditorSettings } from "hooks/useEditorSettings";
import { List } from "immutable";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSignLocation, deleteSignLocation, updateSignCoordinate } from "../../../actions/items";
import LocationItem from "./LocationItem";

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

const LocationSection = ({ index }) => {
  const classes = useStyles();
  const { bungee } = useEditorSettings();
  const locations = useSelector((state) =>
    state.items.getIn(["present", index, "locations"], List())
  );
  const dispatch = useDispatch();

  const updateField = useCallback(
    (id, field, number) => (evt) =>
      dispatch(
        updateSignCoordinate(
          index,
          id,
          field,
          number ? parseInt(evt.target.value) : evt.target.value
        )
      ),
    [dispatch, index]
  );
  const deleteItem = useCallback((id) => () => dispatch(deleteSignLocation(index, id)), [
    dispatch,
    index,
  ]);
  const addItem = useCallback(() => dispatch(addSignLocation(index)), [dispatch, index]);
  return (
    <div className={classes.root}>
      {locations.map((location) => (
        <LocationItem
          key={location.get("id")}
          id={location.get("id")}
          x={location.get("x", 0)}
          y={location.get("y", 0)}
          z={location.get("z", 0)}
          world={location.get("world", "")}
          server={location.get("server", "")}
          updateField={updateField}
          deleteItem={deleteItem}
          bungee={bungee}
        />
      ))}
      <Button color="primary" className={classes.button} onClick={addItem}>
        <AddCircleOutlineIcon className={classes.leftIcon} />
        Add location
      </Button>
    </div>
  );
};

export default LocationSection;
