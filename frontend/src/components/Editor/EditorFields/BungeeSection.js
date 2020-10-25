import Grid from "@material-ui/core/Grid";
import { useEditorSettings } from "hooks/useEditorSettings";
import React from "react";
import CheckboxField from "./CheckboxField";
import ServersField from "./ServersField";

const BungeeSection = ({ index }) => {
  const { tritonv } = useEditorSettings();

  return (
    <Grid container spacing={3}>
      {tritonv < 5 && (
        <Grid item xs={12} sm={6}>
          <CheckboxField index={index} path="universal" label="Universal" defaultOn />
        </Grid>
      )}
      <Grid item xs={12} sm={tritonv >= 5 ? 12 : 6}>
        <CheckboxField
          index={index}
          path="blacklist"
          label="Use server list as blacklist"
          defaultOn={tritonv >= 5}
        />
      </Grid>
      <Grid item xs={12}>
        <ServersField index={index} />
      </Grid>
    </Grid>
  );
};

export default BungeeSection;
