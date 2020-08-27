import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import HeartIcon from "@material-ui/icons/Favorite";
import { List as IList } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setPreviewLanguage } from "../../actions/editor";
import { setSettingsState, setTheme } from "../../actions/main";

const styles = (theme) => ({
  versionInfo: {
    padding: theme.spacing(2),
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
            <ListItem>
              <ListItemText primary="Preview language" />
              <ListItemSecondaryAction>
                <Select value={this.props.previewLanguage} onChange={this.props.setPreviewLanguage}>
                  {this.props.availableLanguages.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Typography variant="caption" component="div" className={classes.versionInfo}>
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
  theme: parseInt(state.main.get("theme", localStorage.getItem("theme"))) || 0,
  previewLanguage: state.editor.get("previewLanguage"),
  availableLanguages: state.main.get("availableLanguages", IList()),
});

const mapDispatchToProps = (dispatch) => ({
  toggleTheme: () =>
    dispatch((dispatch, getState) => {
      var targetTheme =
        parseInt(getState().main.get("theme", localStorage.getItem("theme")) || 0) === 1 ? 0 : 1;
      localStorage.setItem("theme", targetTheme);
      dispatch(setTheme(targetTheme));
    }),
  close: () => {
    dispatch(setSettingsState(false));
  },
  setPreviewLanguage: (evt) => {
    dispatch(setPreviewLanguage(evt.target.value));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Settings));
