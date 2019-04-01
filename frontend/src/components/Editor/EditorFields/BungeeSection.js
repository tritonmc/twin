import React, { Component } from "react";
import CheckboxField from "./CheckboxField";
import Grid from "@material-ui/core/Grid";
import ServersField from "./ServersField";

export class MetaSection extends Component {
  render() {
    const { id } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <CheckboxField id={id} path="universal" label="Universal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CheckboxField id={id} path="blacklist" label="Use server list as blacklist" />
        </Grid>
        <Grid item xs={12}>
          <ServersField id={id} />
        </Grid>
      </Grid>
    );
  }
}

export default MetaSection;
