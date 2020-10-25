import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Redirect, useLocation } from "react-router";
import SavedDialog from "./SavedDialog";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "calc(100vh - 64px)",
    alignItems: "center",
  },
});

const Saved = () => {
  const classes = useStyles();
  const location = useLocation();

  const configId = location?.state?.savedId;

  if (!configId) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <SavedDialog configId={configId} />
    </div>
  );
};

export default Saved;
