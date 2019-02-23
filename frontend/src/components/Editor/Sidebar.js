import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ArchiveIcon from "@material-ui/icons/Archive";
import AssistantIcon from "@material-ui/icons/Assistant";
import LogoutIcon from "mdi-material-ui/Logout";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { setId } from "../../actions/main";

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
    const { classes, theme, id, clearId } = this.props;
    const drawer = (
      <div>
        <Hidden xsDown implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        <List>
          <ListItemLink to={`/${id}`} primary="Dashboard" icon={<DashboardIcon />} />
          <ListItemLink to={`/${id}/archive`} primary="Archive" icon={<ArchiveIcon />} />
          <ListItemLink to={`/${id}/suggestions`} primary="Suggestions" icon={<AssistantIcon />} />
          <Divider />
          <li>
            <ListItem button onClick={this.openDialog}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </li>
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
              component={(props) => <Link onClick={clearId} to="/" {...props} />}>
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

class ListItemLink extends React.Component {
  renderLink = (itemProps) => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.main.get("id", ""),
});

const mapDispatchToProps = {
  clearId: () => setId(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Sidebar));
