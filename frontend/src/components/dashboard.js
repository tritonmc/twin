import React, { Component } from "react";
import { Elevation } from "@rmwc/elevation";
//TODO search import { TextField } from "@rmwc/textfield";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@rmwc/circular-progress";
import { connect } from "react-redux";
import axios from "axios";
import { setData } from "../actions/items";
import { setLoading } from "../actions/main";
import ItemList from "./itemList";
import Toolbar from "./toolbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      id: this.props.match.params.id,
    };
  }

  async componentDidMount() {
    try {
      var response = await axios.get("/api/v1/get/" + this.state.id);
      this.props.dispatch(
        setData(
          response.data.data,
          response.data.tritonv,
          response.data.bungee,
          response.data.languages
        )
      );
      this.props.dispatch(setLoading(false));
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
          className={this.props.loading ? "dashboard-content--loading" : ""}>
          {this.props.loading ? (
            <CircularProgress size="xlarge" />
          ) : (
            <React.Fragment>
              <Toolbar />
              <ItemList />
            </React.Fragment>
          )}
        </Elevation>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.main.get("loading"),
  };
};

export default connect(mapStateToProps)(Dashboard);
