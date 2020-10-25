import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalSettingsContext = createContext();

export const useGlobalSettings = () => useContext(GlobalSettingsContext);

export const GlobalSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(parseInt(localStorage.getItem("theme")) || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  return (
    <GlobalSettingsContext.Provider
      value={{
        theme,
        setTheme,
        loading,
        setLoading,
      }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
