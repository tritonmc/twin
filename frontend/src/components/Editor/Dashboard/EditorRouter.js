import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Export from "components/Export/Export";
import { useEditorSettings } from "hooks/useEditorSettings";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ItemList from "./ItemList";
import { DRAWER_WIDTH } from "constants/Settings";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
    display: "flex",
    flexDirection: "column",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
    },
  },
}));

const EditorRouter = () => {
  const classes = useStyles();
  const { drawerOpen } = useEditorSettings();

  return (
    <main
      className={classNames(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}>
      <Switch>
        <Route path="/:id/archive">
          <ItemList archivedOnly />
        </Route>
        <Route path="/:id/export">
          <Export />
        </Route>
        <Route
          path="/:id/collection/:collection"
          render={(props) => (
            <ItemList collection={decodeURIComponent(props.match.params.collection)} />
          )}
        />
        <Route
          path="/:id/tag/:tag"
          render={(props) => <ItemList tag={decodeURIComponent(props.match.params.tag)} />}
        />
        <Route>
          <ItemList />
        </Route>
      </Switch>
    </main>
  );
};

export default EditorRouter;
