import { makeStyles } from "@material-ui/core/styles";
import { EditorSettingsProvider } from "hooks/useEditorSettings";
import { useGlobalSettings } from "hooks/useGlobalSettings";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Settings from "../Core/Settings";
import Loading from "../Loading/Loading";
import EditorRouter from "./Dashboard/EditorRouter";
import SelectedToolbar from "./Dashboard/SelectedToolbar";
import TopAppBar from "./Dashboard/TopAppBar/TopAppBar";
import EditorDialog from "./EditorDialog";
import EditorLoader from "./EditorLoader";
import Sidebar from "./Sidebar/Sidebar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    paddingTop: "64px",
    height: "100%",
  },
});

const Editor = () => {
  const { loading } = useGlobalSettings();
  const [errorLoading, setErrorLoading] = useState(false);
  const classes = useStyles();

  if (errorLoading) return <Redirect to={{ pathname: "/", state: { error: true } }} />;
  if (loading)
    return (
      <EditorSettingsProvider>
        <EditorLoader setErrorLoading={setErrorLoading} />
        <Loading />
      </EditorSettingsProvider>
    );

  return (
    <EditorSettingsProvider>
      <EditorLoader setErrorLoading={setErrorLoading} />
      <TopAppBar />
      <div className={classes.root}>
        <Sidebar />
        <Settings />
        <SelectedToolbar />
        <EditorRouter />
        <EditorDialog />
      </div>
    </EditorSettingsProvider>
  );
};

export default Editor;
