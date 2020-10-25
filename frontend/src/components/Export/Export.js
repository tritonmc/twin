import { Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { List } from "immutable";
import React from "react";
import { useSelector } from "react-redux";
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "1 1 auto",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    overflowY: "auto",
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
