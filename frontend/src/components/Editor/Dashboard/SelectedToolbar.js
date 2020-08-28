import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/CloseRounded";
import classnames from "classnames";
import { List } from "immutable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllSelected } from "../../../actions/editor";
import ArchiveButton from "../EditorFields/ArchiveButton";
import DeleteButton from "../EditorFields/DeleteButton";
import MoveCollectionBulk from "../EditorFields/MoveCollectionBulk";
import { useEditorSettings } from "hooks/useEditorSettings";

const TOOLBAR_HEIGHT = 48;
const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: TOOLBAR_HEIGHT,
    minHeight: TOOLBAR_HEIGHT,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[20],
    zIndex: 50,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hidden: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    bottom: -TOOLBAR_HEIGHT,
  },
  drawerOpen: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      left: DRAWER_WIDTH,
    },
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
}));

const selector = (state) => {
  const selected = state.editor.get("selected");
  const unarchiveAll = !state.items
    .get("present", List())
    .some(
      (v) => selected.includes(v.getIn(["_twin", "id"])) && !v.getIn(["_twin", "archived"], false)
    );
  return { selected, unarchiveAll };
};

const SelectedToolbar = () => {
  const classes = useStyles();
  const { drawerOpen } = useEditorSettings();
  const { selected, unarchiveAll } = useSelector(selector);
  const size = selected.size;
  const dispatch = useDispatch();

  const onCloseIconClick = () => dispatch(setAllSelected(false));

  return (
    <Toolbar
      className={classnames(classes.root, {
        [classes.hidden]: size === 0,
        [classes.drawerOpen]: drawerOpen,
      })}>
      <IconButton
        className={classes.closeButton}
        color="inherit"
        aria-label="Deselect All"
        onClick={onCloseIconClick}>
        <CloseIcon />
      </IconButton>
      <Typography variant="body1" color="inherit" noWrap className={classes.grow}>
        {`${size} item${size === 1 ? "" : "s"} selected`}
      </Typography>
      <div>
        <MoveCollectionBulk items={selected} />
        <DeleteButton item={selected} bulk />
        <ArchiveButton id={selected} bulk archived={unarchiveAll} />
      </div>
    </Toolbar>
  );
};

export default SelectedToolbar;
