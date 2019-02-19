import React, { Component } from "react";
import styles from "./TopAppBar.scss";
import { SimpleTopAppBar, TopAppBarFixedAdjust } from "@rmwc/top-app-bar";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { setTheme } from "../../../actions/main";

class TopAppBar extends Component {
  render() {
    return (
      <>
        <SimpleTopAppBar
          className={styles.topAppBar}
          title="TWIN"
          navigationIcon={{ onClick: () => console.log("Navigate") }}
          actionItems={[{ onClick: this.props.toggleTheme, icon: "lightbulb" }]}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleTheme: () =>
    dispatch((dispatch, getState) => {
      var targetTheme =
        parseInt(getState().main.get("theme", ownProps.cookies.get("theme")) || 0) === 1 ? 0 : 1;
      ownProps.cookies.set("theme", targetTheme, { path: "/" });
      dispatch(setTheme(targetTheme));
    }),
});

export default withCookies(
  connect(
    null,
    mapDispatchToProps
  )(TopAppBar)
);
