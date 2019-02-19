import React, { Component } from "react";
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent,
  CardActionButtons,
  CardActionButton,
  CardActions,
} from "@rmwc/card";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import { Typography } from "@rmwc/typography";
import "@material/typography/dist/mdc.typography.css";
import "@material/elevation/dist/mdc.elevation.css";
import TextField from "../../Material/TextField/TextField";
import { Button } from "@rmwc/button";
import "@material/button/dist/mdc.button.css";
import { Redirect } from "react-router-dom";
import styles from "./InputDialog.scss";

class InputDialog extends Component {
  constructor() {
    super();
    this.state = { redirect: false, configId: "" };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.loadConfig = this.loadConfig.bind(this);
  }

  onKeyDown(evt) {
    if (evt.key !== "Enter") return;
    this.loadConfig();
  }

  onChange(evt) {
    this.setState({ configId: evt.target.value });
  }

  loadConfig() {
    console.log("Loading config...");
    //aXVnTmhQeFJuYw==
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) return <Redirect to={"/" + this.state.configId} push />;
    return (
      <Card className={[styles.card, "mdc-elevation--z10"]}>
        <Typography use="headline6" theme="textPrimaryOnBackground">
          To start editing, please enter your Config ID
        </Typography>
        <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
          You can get your Config ID by doing <code>/twin</code> in-game
        </Typography>
        <TextField outlined label="Config ID" onKeyDown={this.onKeyDown} onChange={this.onChange} />
        <CardActions>
          <CardActionButtons>
            <CardActionButton
              label="Load Config"
              trailingIcon="chevron_right"
              raised
              onClick={this.loadConfig}
            />
          </CardActionButtons>
        </CardActions>
      </Card>
    );
  }
}

export default InputDialog;
