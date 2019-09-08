import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { List } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSignCoordinate, deleteSignLocation, addSignLocation } from "../../../actions/items";
import LocationItem from "./LocationItem";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
});

export class LocationSection extends Component {
  render() {
    const { locations, bungee, updateField, deleteItem, addItem, classes } = this.props;
    return (
      <div className={classes.root}>
        {locations.map((location, index) => (
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
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id);
  return {
    locations: item ? item.get("locations", List()) : List(),
    bungee: state.main.get("bungee", false),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (id, field, number) => (evt) => {
    dispatch(
      updateSignCoordinate(
        ownProps.id,
        id,
        field,
        number ? parseInt(evt.target.value) : evt.target.value
      )
    );
  },
  deleteItem: (id) => () => {
    dispatch(deleteSignLocation(ownProps.id, id));
  },
  addItem: () => {
    dispatch(addSignLocation(ownProps.id));
  },
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocationSection)
);
