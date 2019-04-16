import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import CloseIcon from "@material-ui/icons/Close";
import HeartIcon from "@material-ui/icons/Favorite";
import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { setSettingsState, setTheme } from "../../actions/main";

const styles = (theme) => ({
  versionInfo: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
  },
  heartIcon: {
    verticalAlign: "middle",
  },
  inlineIcon: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Settings extends Component {
  render() {
    const { isOpen, close, toggleTheme, theme, classes } = this.props;
    return (
      <Dialog
        onClose={close}
        aria-labelledby="settings-title"
        open={isOpen}
        classes={{ paper: classes.container }}>
        <DialogTitle id="settings-title">
          <IconButton aria-label="Close" className={classes.inlineIcon} onClick={close}>
            <CloseIcon />
          </IconButton>
          Settings
        </DialogTitle>
        <div>
          <List>
            <ListItem button onClick={toggleTheme}>
              <ListItemText primary="Use dark theme" />
              <ListItemSecondaryAction>
                <Switch checked={parseInt(theme) === 1} onChange={toggleTheme} value="darkTheme" />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Typography variant="caption" className={classes.versionInfo}>
            {`TWIN v${process.env.REACT_APP_VERSION} developed with `}
            <HeartIcon className={classes.heartIcon} color="secondary" /> {`by Diogo Correia`}
          </Typography>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.main.get("settingsOpen", false),
  theme: state.main.get("theme", ownProps.cookies.get("theme")) || 0,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleTheme: () =>
    dispatch((dispatch, getState) => {
      var targetTheme =
        parseInt(getState().main.get("theme", ownProps.cookies.get("theme")) || 0) === 1 ? 0 : 1;
      ownProps.cookies.set("theme", targetTheme, { path: "/", maxAge: 2147483647 });
      dispatch(setTheme(targetTheme));
    }),
  close: () => {
    dispatch(setSettingsState(false));
  },
});

export default withCookies(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Settings)
  )
);
