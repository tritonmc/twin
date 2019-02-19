import React from "react";
import styles from "./Editor.scss";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@rmwc/circular-progress";
import { connect } from "react-redux";
import axios from "axios";
import { setLoading } from "../../actions/main";
import { fromJS } from "immutable";
import uuid from "uuid/v4";
import Loading from "../Loading/Loading";
import Sidebar from "./Sidebar/Sidebar";
import ItemList from "./ItemList/ItemList";

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
      /*this.props.setId(this.props.match.params.id);
      this.props.setData(
        this.processData(response.data.data),
        response.data.tritonv,
        response.data.bungee,
        response.data.languages
      );*/
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
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <div className={styles.body}>
        <Sidebar />
        <ItemList />
      </div>
    );
    /*return (
      <div className="dashboard">
        <div
          className={
            this.props.loading
              ? "dashboard-content dashboard-content--loading"
              : "dashboard-content"
          }>
          {this.props.loading ? (
            <CircularProgress size="xlarge" />
          ) : (
            <React.Fragment>
              <Toolbar />
              <ItemList />
              <ItemEditor />
            </React.Fragment>
          )}
        </div>
      </div>
    );*/
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
  return { loading: state.main.get("loading", false) };
};

const mapDispatchToProps = { setLoading };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
