import React, { createContext, useContext, useState } from "react";

const EditorSettingsContext = createContext();

export const useEditorSettings = () => useContext(EditorSettingsContext);

export const EditorSettingsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <EditorSettingsContext.Provider
      value={{
        loading,
        setLoading,
        drawerOpen,
        setDrawerOpen,
        search,
        setSearch,
      }}>
      {children}
    </EditorSettingsContext.Provider>
  );
};
