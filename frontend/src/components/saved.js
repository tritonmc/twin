import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showSnack } from "react-redux-snackbar";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configId: (this.props.location.state && this.props.location.state.id) || undefined,
    };
  }

  render() {
    if (!this.state.configId) return <Redirect to="/" push />;
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
          <CopyToClipboard text={"/twin " + this.state.configId}>
            <Button
              outlined
              onClick={() => {
                this.props.dispatch(
                  showSnack("", {
                    label: "Copied to clipboard!",
                    timeout: 1500,
                    button: { label: "OK, GOT IT" },
                  })
                );
              }}>
              Copy to Clipboard
            </Button>
          </CopyToClipboard>
          <span> </span>
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

export default connect()(Home);
