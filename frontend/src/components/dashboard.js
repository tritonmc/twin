import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <Redirect to={{ pathname: "/", state: { error: true, id: this.props.match.params.id } }} />
    );
    return (
      <div id="home">
        <Elevation z="3" id="resource-input">
          <p>{this.props.match.params.id}</p>
        </Elevation>
      </div>
    );
  }
}

export default Dashboard;
