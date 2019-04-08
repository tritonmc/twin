import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "immutable";
import LocationItem from "./LocationItem";

export class LocationSection extends Component {
  render() {
    const { locations, bungee, updateField } = this.props;
    return (
      <div>
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
            bungee={bungee}
          />
        ))}
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
  updateField: () => {
    console.log("updateField()");
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSection);
