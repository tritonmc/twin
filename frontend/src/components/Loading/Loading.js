import React, { Component } from "react";
import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/circular-progress.css";
import styles from "./Loading.scss";

class Loading extends Component {
  render() {
    return (
      <div className={styles.body}>
        <CircularProgress style={{ margin: "auto" }} size="xlarge" />
      </div>
    );
  }
}

export default Loading;
