import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ArchiveIcon from "@material-ui/icons/Archive";
//import AssistantIcon from "@material-ui/icons/Assistant";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TagIcon from "@material-ui/icons/Label";
import SettingsIcon from "@material-ui/icons/Settings";
import { List as IList, Map } from "immutable";
import LogoutIcon from "mdi-material-ui/Logout";
import React from "react";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { setId, setSettingsState } from "../../actions/main";
import ListSubheader from "@material-ui/core/ListSubheader";
import CollectionIcon from "@material-ui/icons/StyleRounded";
import AddCollectionButton from "./AddCollectionButton";

const drawerWidth = 240;

const styles = (theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    "&::-webkit-scrollbar": {
      width: 7,
      height: 7,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.main, 0.15),
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
    },
  },
  toolbar: theme.mixins.toolbar,
  logoutButton: {
    color: theme.palette.error.main,
  },
});

class Sidebar extends React.PureComponent {
  constructor() {
    super();
    this.state = { dialogOpen: false };
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  closeDialog() {
    this.setState({ dialogOpen: false });
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  render() {
    const { classes, theme, id, clearId, openSettings, tags, metadata } = this.props;
    const drawer = (
      <div>
        <Hidden xsDown implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        <List>
          <ListItemLink to={`/${id}`} primary="Dashboard" icon={<DashboardIcon />} />
          <ListItemLink to={`/${id}/archive`} primary="Archive" icon={<ArchiveIcon />} />
          {/*<ListItemLink to={`/${id}/suggestions`} primary="Suggestions" icon={<AssistantIcon />} />*/}
          {!!metadata && (
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
          <ListItem button onClick={this.openDialog}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Leave without saving?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you leave now, any changes you made won't be saved! You cannot undo this action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button
              className={classes.logoutButton}
              autoFocus
              onClick={clearId}
              component={React.forwardRef((props, ref) => (
                <Link innerRef={ref} to="/" {...props} />
              ))}>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.props.drawerOpen}
            onClose={this.props.toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            variant="persistent"
            anchor="left"
            open={this.props.drawerOpen}
            classes={{
              paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

const useStylesItemLink = makeStyles((theme) => ({
  linkSelected: {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const ListItemLink = ({ to, icon, primary }) => {
  const renderLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const classes = useStylesItemLink();
  return (
    <li>
      <ListItem button component={renderLink} to={to} activeClassName={classes.linkSelected} exact>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const mapStateToProps = (state) => ({
  id: state.main.get("id", ""),
  tags: state.editor.get("tags", IList()),
  metadata:
    state.main.get("tritonVersion", 1) >= 4
      ? state.editor.get("metadata", Map()).keySeq()
      : undefined,
});

const mapDispatchToProps = {
  clearId: () => setId(),
  openSettings: () => setSettingsState(true),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Sidebar));
