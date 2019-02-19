import React, { PureComponent } from "react";
import { GridCell, GridInner } from "@rmwc/grid";
import { IconButton } from "@rmwc/icon-button";
import { changeSignCoordinate, removeSignCoordinate, addSignCoordinate } from "../../actions/items";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";
import ItemCoordinate from "./itemCoordinate";
import { Map, List } from "immutable";

class ItemLocations extends PureComponent {
  constructor(props) {
    super(props);
    this.onCoordinateRemoveClick = this.onCoordinateRemoveClick.bind(this);
  }

  render() {
    var { id } = this.props;
    return (
      <GridCell phone="4" tablet={"8"} desktop={"12"}>
        <GridInner>
          <span style={{ fontSize: "1.5em" }}>Coordinates</span>
          <LocationItemList id={id} />
          <LocationInput id={id} />
        </GridInner>
      </GridCell>
    );
  }
  onCoordinateRemoveClick(value) {
    var { dispatch, langKey } = this.props;
    dispatch(removeSignCoordinate(langKey, value));
  }
}

const LocationItemList = connect((store, ownProps) => {
  return {
    values: store.items.getIn(["data", "present", ownProps.id, "locations"], List()),
  };
})(
  class LocationItemList extends React.Component {
    constructor(props) {
      super(props);
      this.onCoordinateRemoveClick = this.onCoordinateRemoveClick.bind(this);
    }
    shouldComponentUpdate(newProps) {
      return newProps.values.size !== this.props.values.size;
    }
    render() {
      return (
        <React.Fragment>
          {this.props.values.map((v, i) => {
            return (
              <LocationItem
                key={v.get("uuid")}
                id={this.props.id}
                index={i}
                onClick={this.onCoordinateRemoveClick}
              />
            );
          })}
        </React.Fragment>
      );
    }
    onCoordinateRemoveClick(value) {
      var { dispatch, id } = this.props;
      dispatch(removeSignCoordinate(id, value));
    }
  }
);

class LocationAddButton extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    var { onClick } = this.props;
    return <IconButton icon="add_circle" onClick={onClick} />;
  }
}

const LocationItem = connect((state, ownProps) => {
  return {
    bungee: state.items.get("bungee", false),
    value: state.items.getIn(["data", "present", ownProps.id, "locations", ownProps.index], Map()),
  };
})(
  class LocationItem extends PureComponent {
    constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.onClick = this.onClick.bind(this);
    }
    onClick() {
      this.props.onClick(this.props.index);
    }
    onBlur(evt, fKey) {
      var value =
        fKey === "world" || fKey === "server" ? evt.target.value : parseInt(evt.target.value, 10);
      if (this.props.value.get(fKey) === value) return;
      this.props.dispatch(changeSignCoordinate(this.props.id, this.props.index, fKey, value));
    }
    render() {
      var { value, bungee } = this.props;
      return (
        <GridCell phone="4" tablet="8" desktop="12">
          <GridInner>
            {bungee && (
              <ItemCoordinate
                value={value.get("server", "")}
                onBlur={this.onBlur}
                field="Server"
                bungee={bungee}
              />
            )}
            <ItemCoordinate
              value={value.get("world", "")}
              onBlur={this.onBlur}
              field="World"
              bungee={bungee}
            />
            <ItemCoordinate
              value={value.get("x", 0)}
              onBlur={this.onBlur}
              field="X"
              bungee={bungee}
            />
            <ItemCoordinate
              value={value.get("z", 0)}
              onBlur={this.onBlur}
              field="Z"
              bungee={bungee}
            />
            <ItemCoordinate
              value={value.get("y", 0)}
              onBlur={this.onBlur}
              field="Y"
              bungee={bungee}
            />
            <GridCell span="1">
              <IconButton
                icon="delete_forever"
                className="accent-hover-button"
                onClick={this.onClick}
              />
            </GridCell>
          </GridInner>
        </GridCell>
      );
    }
  }
);

const LocationInput = connect((state) => {
  return { bungee: state.items.get("bungee", false) };
})(
  class LocationInput extends PureComponent {
    constructor(props) {
      super(props);
      this.tagInput = React.createRef();
      this.onLocationAddClick = this.onLocationAddClick.bind(this);
      this.onBlur = this.onBlur.bind(this);
      this.state = {
        server: "",
        world: "",
        x: 0,
        y: 0,
        z: 0,
      };
    }
    onLocationAddClick() {
      var { dispatch, id } = this.props;
      if (!this.state.world) {
        dispatch(
          showSnack("", {
            label: "Please fill in all fields!",
            timeout: 7000,
            button: { label: "OK, GOT IT" },
          })
        );
        return;
      }
      dispatch(addSignCoordinate(id, Map(this.state)));
      this.setState({
        server: "",
        world: "",
        x: 0,
        y: 0,
        z: 0,
      });
    }
    onBlur(evt, fKey) {
      var value =
        fKey === "world" || fKey === "server" ? evt.target.value : parseInt(evt.target.value, 10);
      if (this.state[fKey] === value) return;
      this.setState({ [fKey]: value });
    }
    render() {
      var { bungee } = this.props;
      return (
        <GridCell phone="4" tablet="8" desktop="12" className="coordinates--input">
          <GridInner>
            {bungee && (
              <ItemCoordinate
                value={this.state.server}
                onBlur={this.onBlur}
                field="Server"
                bungee={bungee}
              />
            )}
            <ItemCoordinate
              value={this.state.world}
              onBlur={this.onBlur}
              field="World"
              bungee={bungee}
            />
            <ItemCoordinate value={this.state.x} onBlur={this.onBlur} field="X" bungee={bungee} />
            <ItemCoordinate value={this.state.z} onBlur={this.onBlur} field="Z" bungee={bungee} />
            <ItemCoordinate value={this.state.y} onBlur={this.onBlur} field="Y" bungee={bungee} />
            <GridCell span="1">
              <LocationAddButton onClick={this.onLocationAddClick} />
            </GridCell>
          </GridInner>
        </GridCell>
      );
    }
  }
);

export default connect()(ItemLocations);
