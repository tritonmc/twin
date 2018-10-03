import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
//TODO search import { TextField } from "@rmwc/textfield";
//import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@rmwc/circular-progress";
import { connect } from "react-redux";
import TextItem from "./items";
import axios from "axios";
import { setData } from "../actions/items";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      id: this.props.match.params.id,
    };
  }

  async componentDidMount() {
    try {
      var response = await axios.get("/api/v1/get/" + this.state.id);
      this.props.dispatch(
        setData(response.data.data, response.data.tritonv, response.data.languages)
      );
      this.setState({
        loading: false,
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
    );
  }

  getItemList() {
    var result = [];
    this.props.data.forEach((data, i) => {
      if (i !== 0) result.push(<hr key={i} />);
      if (data.get("type") === "text") {
        result.push(
          <TextItem
            key={data.get("key")}
            languages={data.get("languages")}
            langKey={data.get("key")}
            description={data.get("description")}
            universal={data.get("universal")}
            tags={data.get("tags")}
            servers={data.get("servers")}
            blacklist={data.get("blacklist")}
            availableLanguages={this.props.availableLanguages}
            dispatch={this.props.dispatch}
            isDuplicateKey={(key) => this.isDuplicateKey(key)}
          />
        );
      }
    });
    return result;
  }

  isDuplicateKey(key) {
    return (
      this.props.data.findIndex((item) => {
        return item.get("key") === key;
      }) !== -1
    );
  }
}

const mapStateToProps = (state) => {
  var root = state.items.itemListRoot;
  return {
    data: root.get("data"),
    tritonVersion: root.get("tritonVersion"),
    availableLanguages: root.get("availableLanguages"),
  };
};

export default connect(mapStateToProps)(Dashboard);
