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

class ServerItem extends Component {
  changeName = (evt) => this.props.changeField(this.props.id, "name", evt.target.value);
  changeContent = (evt) => this.props.changeField(this.props.id, "content", evt.target.value);
  deleteItem = () => this.props.deleteItem(this.props.id);

  render() {
    const { classes, id, name, content } = this.props;
    return (
      <Grid container alignItems="center" className={classes.root}>
        <Grid container item xs spacing={2} alignItems="center">
          <Grid item xs={12} classes={{ item: classes.gridSpacing }}>
            <TextField
              id={`${id}-name`}
              label={"Server name"}
              value={name}
              onChange={this.changeName}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} classes={{ item: classes.gridSpacing }}>
            <TextField
              id={`${id}-content`}
              label={"languages.json content"}
              value={content}
              onChange={this.changeContent}
              margin="normal"
              variant="outlined"
              multiline
              rows={8}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item>
          <IconButton className={classes.button} aria-label="Delete" onClick={this.deleteItem}>
            <HighlighOffIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ServerItem);
