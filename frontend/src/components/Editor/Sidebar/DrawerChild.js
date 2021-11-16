import {
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArchiveIcon from "@material-ui/icons/Archive";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExportIcon from "@material-ui/icons/ImportExportRounded";
import TagIcon from "@material-ui/icons/Label";
import SettingsIcon from "@material-ui/icons/Settings";
import CollectionIcon from "@material-ui/icons/StyleRounded";
import WarningIcon from "@material-ui/icons/WarningRounded";
import { useEditorSettings } from "hooks/useEditorSettings";
import { List as IList, Map } from "immutable";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddCollectionButton from "./AddCollectionButton";
import DeleteCollectionButton from "./DeleteCollectionButton";
import ListItemLink from "./ListItemLink";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const DrawerChild = () => {
  const { id } = useParams();
  const { tritonv, setSettingsOpen } = useEditorSettings();
  const { tags, metadata } = useSelector((state) => ({
    tags: state.editor.get("tags", IList()),
    metadata: state.editor.get("metadata", Map()).keySeq(),
  }));
  const classes = useStyles();

  const openSettings = () => setSettingsOpen(true);

  return (
    <div>
      <Hidden smDown implementation="css">
        <div className={classes.toolbar} />
      </Hidden>
      <List>
        <ListItemLink to={`/${id}`} primary="Dashboard" icon={<DashboardIcon />} />
        <ListItemLink to={`/${id}/archive`} primary="Archive" icon={<ArchiveIcon />} />
        <ListItemLink to={`/${id}/export`} primary="Export/Import" icon={<ExportIcon />} />
        <ListItemLink
          to={`/${id}/errors-warnings`}
          primary="Errors &amp; Warnings"
          icon={<WarningIcon />}
        />
        {tritonv >= 4 && (
          <>
            <Divider />
            <ListSubheader>Collections</ListSubheader>
            {metadata.sort().map((collection) => (
              <ListItemLink
                key={collection}
                to={`/${id}/collection/${encodeURIComponent(collection)}`}
                primary={collection}
                icon={<CollectionIcon />}
              />
            ))}
            <AddCollectionButton />
            <DeleteCollectionButton />
          </>
        )}
        <Divider />
        <ListSubheader>Tags</ListSubheader>
        {tags.size > 0 && (
          <>
            {tags.sort().map((tag) => (
              <ListItemLink
                key={tag}
                to={`/${id}/tag/${encodeURIComponent(tag)}`}
                primary={tag}
                icon={<TagIcon />}
              />
            ))}
            <Divider />
          </>
        )}
        <ListItem button onClick={openSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
        <LogoutButton />
      </List>
    </div>
  );
};

export default DrawerChild;
