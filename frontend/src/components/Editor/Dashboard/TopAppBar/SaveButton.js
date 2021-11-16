import { IconButton, ListItemIcon, ListItemText, MenuItem, Tooltip } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { clearData } from "actions/editor";
import axios from "axios";
import { useEditorSettings } from "hooks/useEditorSettings";
import { useGlobalSettings } from "hooks/useGlobalSettings";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import saveV1 from "utils/save";
import saveV2 from "utils/save-v2";

const hasError = (data) =>
  data.some((translation) => {
    // Disallow empty translation keys
    if (!translation.get("key")) return true;

    return false;
  });

const SaveButton = ({ list }) => {
  const dispatch = useDispatch();
  const { setLoading } = useGlobalSettings();
  const { tritonv, bungee } = useEditorSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { replace } = useHistory();
  const { id } = useParams();

  const save = useCallback(
    () =>
      dispatch(async (dispatch, getState) => {
        const state = getState();
        const configVersion = tritonv;
        const data = state.items.get("present");
        const defaultData = state.editor.get("defaultData");
        const metadata = state.editor.get("metadata");

        if (hasError(data)) {
          enqueueSnackbar(
            "There is an error with your current translation list! Please check the Errors & Warning tab for more information.",
            {
              variant: "error",
            }
          );
          return;
        }

        let payload;
        if (configVersion >= 2 && configVersion <= 6) {
          payload = saveV2(data, defaultData, metadata, configVersion);
        } else if (configVersion === 1) {
          payload = saveV1(data, defaultData, bungee);
        } else {
          enqueueSnackbar("This version of TWIN doesn't support the config version you're using!", {
            variant: "error",
          });
          return;
        }

        if (
          payload.deleted.length === 0 &&
          payload.added.length === 0 &&
          Object.keys(payload.modified).length === 0
        ) {
          enqueueSnackbar("You haven't made any changes yet!", { variant: "info" });
          return;
        }

        payload.origin = id;

        try {
          setLoading(true);
          const response = await axios.post("/api/v1/save", payload);
          setLoading(false);
          dispatch(clearData());
          replace("/saved", { savedId: response.data });
        } catch (ex) {
          enqueueSnackbar("Failed to save! Please check your internet connection.", {
            variant: "error",
          });
          setLoading(false);
        }
      }),
    [dispatch, tritonv, setLoading, id, bungee, enqueueSnackbar, replace]
  );

  if (list)
    return (
      <MenuItem onClick={save}>
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText primary="Save" />
      </MenuItem>
    );
  return (
    <Tooltip title="Save">
      <IconButton color="inherit" aria-label="Save" onClick={save}>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SaveButton;
