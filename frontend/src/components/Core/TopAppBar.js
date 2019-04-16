import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { setTheme, setDrawerState } from "../../actions/main";
import { setSearch } from "../../actions/editor";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Lightbulb from "mdi-material-ui/Lightbulb";
import LightbulbOn from "mdi-material-ui/LightbulbOn";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import classnames from "classnames";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { ActionCreators as UndoActionCreators } from "redux-undo-immutable";

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
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
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
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
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

  render() {
    const { classes, canUndo, canRedo, onUndo, onRedo } = this.props;
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
                  <IconButton onClick={onUndo} disabled={!canUndo}>
                    <UndoIcon />
                  </IconButton>
                  <IconButton onClick={onRedo} disabled={!canRedo}>
                    <RedoIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  aria-owns={this.state.isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.props.toggleTheme}
                  color="inherit">
                  {parseInt(this.props.theme) === 0 ? <LightbulbOn /> : <Lightbulb />}
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    showHamburger: store.main.get("id") !== undefined,
    canUndo: store.items.get("past").size > 0,
    canRedo: store.items.get("future").size > 0,
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
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

export default withStyles(styles)(
  withCookies(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TopAppBar)
  )
);
