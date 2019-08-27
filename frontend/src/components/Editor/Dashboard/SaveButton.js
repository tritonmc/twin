import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoading, setSaved } from "../../../actions/main";
import saveV1 from "../../../utils/save";
import saveV2 from "../../../utils/save-v2";

class SaveButton extends Component {
  render() {
    return (
      <Tooltip title="Save">
        <IconButton color="inherit" aria-label="Save" onClick={this.props.save}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

const mapStateToProps = (state) => ({
  configVersion: state.main.get("tritonVersion"),
  data: state.items.get("present"),
  defaultData: state.editor.get("defaultData"),
  bungee: state.main.get("bungee", false),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  save: () =>
    dispatch(async (dispatch, getState) => {
      const state = getState();
      const configVersion = state.main.get("tritonVersion");
      const data = state.items.get("present");
      const defaultData = state.editor.get("defaultData");
      const bungee = state.main.get("bungee", false);
      const { enqueueSnackbar } = ownProps;
      dispatch(setLoading(true));
      var payload;
      if (configVersion === 2 || configVersion === 3) {
        payload = saveV2(data, defaultData);
      } else if (configVersion === 1) {
        payload = saveV1(data, defaultData, bungee);
      } else {
        enqueueSnackbar("This version of TWIN doesn't support the config version you're using!", {
          variant: "error",
        });
        dispatch(setLoading(false));
        return;
      }
      if (
        payload.deleted.length === 0 &&
        payload.added.length === 0 &&
        Object.keys(payload.modified).length === 0
      ) {
        enqueueSnackbar("You haven't made any changes yet!", {
          variant: "info",
        });
        dispatch(setLoading(false));
        return;
      }
      payload["origin"] = getState().main.get("id", "");
      try {
        var response = await axios.post("/api/v1/save", payload);
        dispatch(setLoading(false));
        dispatch(setSaved(response.data));
      } catch (ex) {
        enqueueSnackbar("Failed to save! Please check your internet connection.", {
          variant: "error",
        });
        dispatch(setLoading(false));
      }
    }),
});

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SaveButton)
);
