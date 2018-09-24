import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      configId: (this.props.location.state && this.props.location.state.id) || "",
      notFound: this.props.location.state && this.props.location.state.error === true,
    };
  }

  timeoutErrors() {
    clearTimeout(this.timeout);
    if (this.state.notFound === true)
      this.timeout = setTimeout(() => {
        this.setState({ notFound: false });
      }, 3000);
  }

  componentDidUpdate() {
    this.timeoutErrors();
  }

  componentDidMount() {
    this.timeoutErrors();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (this.state.redirect) return <Redirect to={"/" + this.state.configId} push />;
    return (
      <div id="home">
        <Elevation z="3" id="resource-input">
          <h4>Please enter your config ID</h4>
          <p className="thin-text">
            You can get your config ID by doing <code>/triton web</code> in-game
          </p>
          {this.state.notFound && <p className="error">That config ID does not exist!</p>}
          <TextField
            value={this.state.configId}
            outlined
            label="Config ID"
            className="config-id"
            onChange={(evt) => {
              this.setState({ configId: evt.target.value });
            }}
          />
          <Button
            outlined
            onClick={() => {
              this.setState({ redirect: true });
            }}>
            Let's Go
          </Button>
        </Elevation>
      </div>
    );
  }
}

export default Home;
