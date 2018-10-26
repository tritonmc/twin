import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configId: (this.props.location.state && this.props.location.state.id) || undefined,
    };
  }

  render() {
    if (!this.state.state) return <Redirect to="/home" push />;
    return (
      <div id="home">
        <Elevation z="3" id="resource-input">
          <h4>Config Saved</h4>
          <p className="thin-text">
            You can apply it for your server by executing the following command:
          </p>
          <p>
            <code>{"/twin " + this.state.configId}</code>
          </p>
          <Button
            outlined
            onClick={() => {
              this.setState({ configId: undefined });
            }}>
            Back Home
          </Button>
        </Elevation>
      </div>
    );
  }
}

export default Home;
