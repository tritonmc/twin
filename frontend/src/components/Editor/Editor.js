import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setLoading, setId, setDrawerState } from "../../actions/main";
import { setData } from "../../actions/items";
import { fromJS, Map } from "immutable";
import uuid from "uuid/v4";
import Loading from "../Loading/Loading";
import CssBaseline from "@material-ui/core/CssBaseline";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import ItemList from "./ItemList/ItemList";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
    paddingTop: "64px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
    },
  },
});

class Editor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    try {
      this.props.setLoading(true);
      var response = await axios.get("/api/v1/get/" + this.props.match.params.id);
      this.props.setId(this.props.match.params.id);
      this.props.setData(response.data);
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar drawerOpen={this.props.drawerOpen} toggleDrawer={this.props.toggleDrawer} />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: this.props.drawerOpen,
          })}>
          <ItemList />
        </main>
      </div>
    );
  }
}

const processData = (data) => {
  data = fromJS(data);
  var result = Map();
  data.forEach((item) => {
    result = result.set(uuid(), item);
  });
  return result;
  /*return data.map((v) => {
    if (v.get("type") === "sign")
      return v
        .set("uuid", uuid())
        .update("locations", (loc) => loc.map((v) => v.set("uuid", uuid())));
    return v.set("uuid", uuid());
  });*/
};

const mapStateToProps = (state) => {
  return {
    loading: state.main.get("loading", false),
    drawerOpen: state.main.get("drawerState", false),
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ setLoading, setId }, dispatch),
  toggleDrawer: () =>
    dispatch((dispatch, getState) => {
      dispatch(setDrawerState(!getState().main.get("drawerState", false)));
    }),
  setData: (data) =>
    dispatch(setData(processData(data.data), data.trionv, data.bungee, data.languages)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor));
