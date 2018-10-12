import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
//TODO search import { TextField } from "@rmwc/textfield";
//import { Button } from "@rmwc/button";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@rmwc/circular-progress";
import { connect } from "react-redux";
import axios from "axios";
import { setData } from "../actions/items";
import ItemList from "./itemList";

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
          {this.state.loading ? <CircularProgress size="xlarge" /> : <ItemList />}
        </Elevation>
      </div>
    );
  }
}

export default connect()(Dashboard);
