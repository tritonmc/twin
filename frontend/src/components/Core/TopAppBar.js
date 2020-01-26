import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import classnames from "classnames";
import Lightbulb from "mdi-material-ui/Lightbulb";
import LightbulbOn from "mdi-material-ui/LightbulbOn";
import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { setSearch } from "../../actions/editor";
import { setDrawerState, setTheme } from "../../actions/main";
import AddItemButton from "../Editor/Dashboard/AddItemButton";
import MoreButton from "../Editor/Dashboard/MoreButton";
import SaveButton from "../Editor/Dashboard/SaveButton";
import SortButton from "../Editor/Dashboard/SortButton";
import UndoRedoButtons from "../Editor/Dashboard/UndoRedoButtons";

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
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
});

class TopAppBar extends Component {
  constructor() {
    super();
    this.state = { isMenuOpen: false };
  }
  get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

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
            <Typography
              variant="h6"
              color="inherit"
              className={classnames({ [classes.title]: this.props.showHamburger })}
              noWrap>
              TWIN
            </Typography>
            {this.props.showHamburger && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={this.props.updateSearch}
                />
              </div>
            )}
            <div className={classes.grow} />
            <div>
              {this.props.showHamburger ? (
                <>
                  <Hidden smDown>
                    <UndoRedoButtons />
                    <SortButton />
                    <SaveButton />
                    <Switch>
                      <Route
                        path="/:id/collection/:collection"
                        render={(props) => (
                          <AddItemButton
                            collection={decodeURIComponent(props.match.params.collection)}
                          />
                        )}
                      />
                      <Route component={AddItemButton} />
                    </Switch>
                  </Hidden>
                  <Hidden mdUp>
                    <MoreButton>
                      <div>
                        <UndoRedoButtons list />
                        <SortButton list />
                        <SaveButton list />
                        <AddItemButton list />
                      </div>
                    </MoreButton>
                  </Hidden>
                </>
              ) : (
                <IconButton
                  aria-owns={this.state.isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.props.toggleTheme}
                  color="inherit">
                  {parseInt(this.props.currentTheme) === 0 ? <LightbulbOn /> : <Lightbulb />}
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Helmet>
          <meta
            name="theme-color"
            content={
              this.get(
                ["overrides", "MuiAppBar", "colorPrimary", "backgroundColor"],
                this.props.theme
              ) || this.props.theme.palette.primary.main
            }
          />
        </Helmet>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    showHamburger: store.main.get("id") !== undefined,
  };
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
  updateSearch: (evt) => dispatch(setSearch(evt.target.value)),
});

export default withStyles(styles, { withTheme: true })(
  withCookies(connect(mapStateToProps, mapDispatchToProps)(TopAppBar))
);
