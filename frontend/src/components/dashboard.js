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
import save from "../utils/save";
import { showSnack } from "react-redux-snackbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
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
    if (this.state.saved)
      return <Redirect to={{ pathname: "/saved", state: { id: this.state.saved } }} />;
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
              <Toolbar id={this.state.id} onSave={this.onSave} />
              <ItemList
                data={this.props.data}
                tritonVersion={this.props.tritonVersion}
                bungee={this.props.bungee}
              />
            </React.Fragment>
          )}
        </Elevation>
      </div>
    );
  }

  async onSave() {
    var { dispatch, data, defaultData, bungee } = this.props;
    dispatch(setLoading(true));
    var changedData = save(data, defaultData, bungee);
    if (
      changedData.deleted.length === 0 &&
      changedData.added.length === 0 &&
      Object.keys(changedData.modified).length === 0
    ) {
      dispatch(
        showSnack("", {
          label: "Nothing has changed! Start editing!",
          timeout: 3000,
          button: { label: "OK, GOT IT" },
        })
      );
      dispatch(setLoading(false));
      return;
    }

    changedData["origin"] = this.state.id;

    var response = await axios.post("/api/v1/save", changedData);
    dispatch(setLoading(false));
    this.setState({ saved: response.data });
  }
}

const mapStateToProps = (state) => {
  var root = state.items.itemListRoot;
  return {
    loading: state.main.get("loading"),
    data: root.get("data").get("present"),
    tritonVersion: root.get("tritonVersion"),
    bungee: root.get("bungee"),
    defaultData: root.get("defaultData"),
  };
};

export default connect(mapStateToProps)(Dashboard);
