import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { setTheme, setDrawerState } from "../../actions/main";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Lightbulb from "mdi-material-ui/Lightbulb";
import LightbulbOn from "mdi-material-ui/LightbulbOn";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class TopAppBar extends Component {
  constructor() {
    super();
    this.state = { isMenuOpen: false };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {this.props.showHamburger && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.props.toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              TWIN
            </Typography>
            <div>
              <IconButton
                aria-owns={this.state.isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.props.toggleTheme}
                color="inherit">
                {this.props.theme === 0 ? <LightbulbOn /> : <Lightbulb />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return { showHamburger: store.main.get("id") !== undefined };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleTheme: () =>
    dispatch((dispatch, getState) => {
      var targetTheme =
        parseInt(getState().main.get("theme", ownProps.cookies.get("theme")) || 0) === 1 ? 0 : 1;
      ownProps.cookies.set("theme", targetTheme, { path: "/", maxAge: 2147483647 });
      dispatch(setTheme(targetTheme));
    }),
  toggleDrawer: () =>
    dispatch((dispatch, getState) => {
      dispatch(setDrawerState(!getState().main.get("drawerState", false)));
    }),
});

export default withStyles(styles)(
  withCookies(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TopAppBar)
  )
);
