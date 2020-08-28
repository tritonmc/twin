import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import InputDialog from "./InputDialog";
import TopAppBar from "./TopAppBar";
import Footer from "./Footer";

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
      <Footer />
    </div>
  );
};

export default Home;
