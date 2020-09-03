import React, { Component } from "react";
import CheckboxField from "./CheckboxField";
import Grid from "@material-ui/core/Grid";
import ServersField from "./ServersField";
import { connect } from "react-redux";

export class MetaSection extends Component {
  render() {
    const { id, tritonVersion } = this.props;
    return (
      <Grid container spacing={3}>
        {tritonVersion < 5 && (
          <Grid item xs={12} sm={6}>
            <CheckboxField id={id} path="universal" label="Universal" default={true} />
          </Grid>
        )}
        <Grid item xs={12} sm={tritonVersion >= 5 ? 12 : 6}>
          <CheckboxField
            id={id}
            path="blacklist"
            label="Use server list as blacklist"
            default={tritonVersion >= 5}
          />
        </Grid>
        <Grid item xs={12}>
          <ServersField id={id} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  tritonVersion: /*state.main.get("tritonVersion", 1)*/ 6, // HOT FIX
});

export default connect(mapStateToProps)(MetaSection);
