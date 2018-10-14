import React, { PureComponent } from "react";
import { TextField } from "@rmwc/textfield";
import { GridCell } from "@rmwc/grid";

class ItemCoordinate extends PureComponent {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
  }
  onBlur(evt) {
    this.props.onBlur(evt, this.props.field.toLowerCase());
  }
  render() {
    var { value, field, bungee } = this.props;
    return (
      <GridCell
        desktop={
          bungee
            ? field === "Server" || field === "World"
              ? "6"
              : field === "Y"
                ? "3"
                : "4"
            : field === "World"
              ? "5"
              : "2"
        }
        phone={field === "Y" ? "3" : "4"}
        tablet={field === "Server" ? "4" : field === "World" ? (bungee ? "4" : "8") : "2"}>
        <TextField
          style={{ width: "100%" }}
          value={value}
          type={field === "World" || field === "Server" ? "text" : "number"}
          onChange={this.onBlur}
          withLeadingIcon={field === "World" ? "map" : field === "Server" ? "cloud" : ""}
          label={field}
        />
      </GridCell>
    );
  }
}

export default ItemCoordinate;
