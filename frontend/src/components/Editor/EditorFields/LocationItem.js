import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import HighlighOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  gridSpacing: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
});

export class LocationItem extends Component {
  render() {
    const { bungee, x, y, z, world, server, id, classes, updateField, deleteItem } = this.props;
    return (
      <Grid container alignItems="center" className={classes.root}>
        <Grid container item xs spacing={2} alignItems="center">
          {bungee && (
            <Grid item xs={6} md={3} classes={{ item: classes.gridSpacing }}>
              <TextField
                id={"editor-location-field-server-" + id}
                label={"Server"}
                defaultValue={server}
                onBlur={updateField(id, "server", false)}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
          )}
          <Grid
            item
            xs={bungee ? 6 : 12}
            md={bungee ? 3 : 6}
            classes={{ item: classes.gridSpacing }}>
            <TextField
              id={"editor-location-field-world-" + id}
              label={"World"}
              defaultValue={world}
              onBlur={updateField(id, "world", false)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4} md={2} classes={{ item: classes.gridSpacing }}>
            <TextField
              id={"editor-location-field-x-" + id}
              label={"X"}
              defaultValue={x}
              onBlur={updateField(id, "x", true)}
              margin="normal"
              variant="outlined"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={4} md={2} classes={{ item: classes.gridSpacing }}>
            <TextField
              id={"editor-location-field-y-" + id}
              label={"Y"}
              defaultValue={y}
              onBlur={updateField(id, "y", true)}
              margin="normal"
              variant="outlined"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={4} md={2} classes={{ item: classes.gridSpacing }}>
            <TextField
              id={"editor-location-field-z-" + id}
              label={"Z"}
              defaultValue={z}
              onBlur={updateField(id, "z", true)}
              margin="normal"
              variant="outlined"
              type="number"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item>
          <IconButton className={classes.button} aria-label="Delete" onClick={deleteItem(id)}>
            <HighlighOffIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LocationItem);
