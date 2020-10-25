import { Drawer, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { DRAWER_WIDTH } from "constants/Settings";
import { useEditorSettings } from "hooks/useEditorSettings";
import React from "react";
import DrawerChild from "./DrawerChild";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
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
}));

const Sidebar = () => {
  const { drawerOpen, setDrawerOpen } = useEditorSettings();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant={mobile ? "temporary" : "persistent"}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        classes={{ paper: classes.drawerPaper }}>
        <DrawerChild />
      </Drawer>
    </nav>
  );
};

export default Sidebar;
