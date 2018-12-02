import React from "react";
import { connect } from "react-redux";

class Sidebar extends React.PureComponent {
  render() {
    return (
      <div id="sidebar">
        <p>Lorem ipsum</p>
      </div>
    );
  }
}

export default connect()(Sidebar);
