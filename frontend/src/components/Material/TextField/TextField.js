import React, { Component } from "react";
import { TextField as RMWCTextField } from "@rmwc/textfield";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import styles from "./TextField.scss";

class TextField extends Component {
  render() {
    return <RMWCTextField {...this.props} className={styles.textfield} />;
  }
}

export default TextField;
