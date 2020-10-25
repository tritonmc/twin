import React from "react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@material-ui/core";

const ThemeColor = () => {
  const theme = useTheme();
  return (
    <Helmet>
      <meta
        name="theme-color"
        content={
          theme?.overrides?.MuiAppBar?.colorPrimary?.backgroundColor || theme.palette.primary.main
        }
      />
    </Helmet>
  );
};

export default ThemeColor;
