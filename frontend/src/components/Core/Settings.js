import {
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Footer from "components/Home/Footer";
import { useEditorSettings } from "hooks/useEditorSettings";
import { useGlobalSettings } from "hooks/useGlobalSettings";
import React from "react";

const useStyles = makeStyles((theme) => ({
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
}));

const Settings = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    languages,
    previewLanguage,
    setPreviewLanguage,
  } = useEditorSettings();
  const { theme, setTheme } = useGlobalSettings();
  const classes = useStyles();

  const closeSettings = () => setSettingsOpen(false);
  const toggleTheme = () => setTheme(theme === 1 ? 0 : 1);
  const changePreviewLanguage = (evt) => setPreviewLanguage(evt.target.value);

  return (
    <Dialog
      onClose={closeSettings}
      aria-labelledby="settings-title"
      open={settingsOpen}
      classes={{ paper: classes.container }}>
      <DialogTitle id="settings-title">
        <IconButton aria-label="Close" className={classes.inlineIcon} onClick={closeSettings}>
          <CloseIcon />
        </IconButton>
        Settings
      </DialogTitle>
      <div>
        <List>
          <ListItem button onClick={toggleTheme}>
            <ListItemText primary="Use dark theme" />
            <ListItemSecondaryAction>
              <Switch checked={theme === 1} onChange={toggleTheme} value="darkTheme" />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Preview language" />
            <ListItemSecondaryAction>
              <Select value={previewLanguage} onChange={changePreviewLanguage}>
                {languages.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Footer />
      </div>
    </Dialog>
  );
};

export default Settings;
