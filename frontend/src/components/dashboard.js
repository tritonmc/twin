import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
//TODO search import { TextField } from "@rmwc/textfield";
//import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@rmwc/circular-progress";
import TextItem from "./items";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      id: this.props.match.params.id,
      data: [],
      tritonVersion: -1,
    };
  }

  async componentDidMount() {
    try {
      var response = await axios.get("/api/v1/get/" + this.state.id);
      this.setState({
        loading: false,
        data: response.data.data,
        tritonVersion: response.data.tritonv,
      });
    } catch (ex) {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.state.error)
      return (
        <Redirect to={{ pathname: "/", state: { error: true, id: this.props.match.params.id } }} />
      );
    return (
      <div id="dashboard">
        <div className="dashboard-background-holder">
          <Elevation
            z="3"
            id="dashboard-content"
            className={this.state.loading ? "dashboard-content--loading" : ""}>
            {this.state.loading ? (
              <CircularProgress size="xlarge" />
            ) : (
              <div className="language-items-container">{this.getItemList()}</div>
            )}
          </Elevation>
        </div>
      </div>
    );
  }

  getItemList() {
    var result = [];
    this.state.data.forEach((data, i) => {
      if (i !== 0) result.push(<hr key={i} />);
      if (data.type === "text") {
        result.push(
          <TextItem
            key={data.key}
            languages={data.languages}
            langKey={data.key}
            description={data.description}
            universal={data.universal}
            tags={data.tags}
            servers={data.servers}
            blacklist={data.blacklist}
          />
        );
      }
    });
    return result;
  }
}

export default Dashboard;
