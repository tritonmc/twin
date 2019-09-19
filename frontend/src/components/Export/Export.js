import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { List } from "immutable";
import { Typography } from "@material-ui/core";
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "1 1 auto",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
}));

const Export = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title />
      <Table />
    </div>
  );
};

const Title = () => {
  const count = useSelector((state) => {
    if (state.editor.get("selected", List()).size === 0)
      return state.items.get("present", List()).size;
    else return state.editor.get("selected", List()).size;
  });
  return (
    <Typography variant="h5">{`Exporting ${count} translation${
      count === 1 ? "" : "s"
    }`}</Typography>
  );
};

export default Export;
