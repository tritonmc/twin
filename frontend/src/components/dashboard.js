import React from "react";
import { Elevation } from "@rmwc/elevation";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@rmwc/circular-progress";
import { connect } from "react-redux";
import axios from "axios";
import { setData } from "../actions/items";
import { setLoading, setId } from "../actions/main";
import ItemList from "./itemList";
import Toolbar from "./toolbar";
import { showSnack } from "react-redux-snackbar";
import ItemEditor from "./itemEditor";
import { fromJS } from "immutable";
import uuid from "uuid/v4";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    try {
      var response = await axios.get("/api/v1/get/" + this.props.match.params.id);
      this.props.setId(this.props.match.params.id);
      this.props.setData(
        this.processData(response.data.data),
        response.data.tritonv,
        response.data.bungee,
        response.data.languages
      );
      this.props.setLoading(false);
    } catch (ex) {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.props.saved)
      return <Redirect to={{ pathname: "/saved", state: { id: this.props.saved } }} />;
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
              <ItemEditor />
            </React.Fragment>
          )}
        </Elevation>
      </div>
    );
  }

  processData(data) {
    data = fromJS(data);
    return data.map((v) => {
      if (v.get("type") === "sign")
        return v
          .set("uuid", uuid())
          .update("locations", (loc) => loc.map((v) => v.set("uuid", uuid())));
      return v.set("uuid", uuid());
    });
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.main.get("loading"),
    saved: state.main.get("saved"),
  };
};

const mapDispatchToProps = { setId, setData, setLoading, showSnack };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
