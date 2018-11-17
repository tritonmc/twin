import { setLoading, setSaved } from "./main";
import { showSnack } from "react-redux-snackbar";
import save from "../utils/save";
import axios from "axios";

export default () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    var changedData = save(
      getState().items.getIn(["data", "present"]),
      getState().items.getIn(["defaultData"]),
      getState().items.get("bungee", false)
    );
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

    changedData["origin"] = getState().main.get("id", "");

    try {
      var response = await axios.post("/api/v1/save", changedData);
      dispatch(setLoading(false));
      dispatch(setSaved(response.data));
    } catch (ex) {
      dispatch(
        showSnack("", {
          label: "Failed to save! Please check your internet connection.",
          timeout: 3000,
          button: { label: "OK, GOT IT" },
        })
      );
    }
  };
};
