import { Grid, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HighlighOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";

const useStyles = makeStyles((theme) => ({
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
}));

const LocationItem = ({ bungee, x, y, z, world, server, id, updateField, deleteItem }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid container item xs spacing={2} alignItems="center">
        {bungee && (
          <Grid item xs={6} md={3} classes={{ item: classes.gridSpacing }}>
            <TextField
              id={"editor-location-field-server-" + id}
              label={"Server"}
              defaultValue={server}
              // Use key here so it updates on undo/redo
              key={server}
              onBlur={updateField(id, "server", false)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}
        <Grid item xs={bungee ? 6 : 12} md={bungee ? 3 : 6} classes={{ item: classes.gridSpacing }}>
          <TextField
            id={"editor-location-field-world-" + id}
            label={"World"}
            defaultValue={world}
            key={world}
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
            key={x}
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
            key={y}
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
            key={z}
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
};

export default LocationItem;
