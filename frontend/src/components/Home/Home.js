import React, { Component } from "react";
import InputDialog from "./InputDialog/InputDialog";
import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/circular-progress.css";
import styles from "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div className={styles.body}>
        <InputDialog />
      </div>
    );
  }
}

export default Home;
