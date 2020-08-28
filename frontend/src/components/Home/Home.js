import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import InputDialog from "./InputDialog";
import TopAppBar from "./TopAppBar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "calc(100vh - 64px)",
    alignItems: "center",
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <TopAppBar />
      <div className={classes.root}>
        <InputDialog />
      </div>
    </div>
  );
};

export default Home;
