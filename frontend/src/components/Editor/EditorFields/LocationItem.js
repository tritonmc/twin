import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export class LocationItem extends Component {
  render() {
    const { bungee, x, y, z, world, server, id } = this.props;
    return (
      <Grid container spacing={16}>
        {bungee && (
          <Grid item xs>
            <TextField
              id={"editor-location-field-server-" + id}
              label={"Server"}
              defaultValue={server}
              onBlur={this.updateField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}
        <Grid item xs>
          <TextField
            id={"editor-location-field-world-" + id}
            label={"World"}
            defaultValue={world}
            onBlur={this.updateField}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            id={"editor-location-field-x-" + id}
            label={"X"}
            defaultValue={x}
            onBlur={this.updateField}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            id={"editor-location-field-y-" + id}
            label={"Y"}
            defaultValue={y}
            onBlur={this.updateField}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            id={"editor-location-field-z-" + id}
            label={"Z"}
            defaultValue={z}
            onBlur={this.updateField}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    );
  }
}

export default LocationItem;
