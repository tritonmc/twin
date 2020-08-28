import React, { createContext, useContext, useState } from "react";

const EditorSettingsContext = createContext();

export const useEditorSettings = () => useContext(EditorSettingsContext);

export const EditorSettingsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [tritonv, setTritonv] = useState(0);
  const [bungee, setBungee] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [previewLanguage, setPreviewLanguage] = useState();

  return (
    <EditorSettingsContext.Provider
      value={{
        loading,
        setLoading,
        drawerOpen,
        setDrawerOpen,
        settingsOpen,
        setSettingsOpen,
        search,
        setSearch,
        tritonv,
        setTritonv,
        bungee,
        setBungee,
        languages,
        setLanguages,
        previewLanguage,
        setPreviewLanguage,
      }}>
      {children}
    </EditorSettingsContext.Provider>
  );
};
