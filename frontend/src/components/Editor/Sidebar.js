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
});

class Sidebar extends React.PureComponent {
  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <Hidden xsDown implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        <List>
          <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
          <ListItemLink to="/archived" primary="Archived" icon={<ArchiveIcon />} />
          <ListItemLink to="/suggestions" primary="Suggestions" icon={<AssistantIcon />} />
          <Divider />
        </List>
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

export default withStyles(styles, { withTheme: true })(Sidebar);
