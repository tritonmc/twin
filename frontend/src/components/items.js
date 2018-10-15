import React, { PureComponent } from "react";
import { Grid, GridCell } from "@rmwc/grid";
import ItemKey from "./items/itemKey";
import ItemUniversal from "./items/itemUniversal";
import ItemBlacklist from "./items/itemBlacklist";
import ItemDescription from "./items/itemDescription";
import ItemTags from "./items/itemTags";
import ItemServers from "./items/itemServers";
import ItemLanguages from "./items/itemLanguages";
import ItemLocations from "./items/itemLocations";
import ItemLines from "./items/itemLines";
import { Map } from "immutable";
import { IconButton } from "@rmwc/icon-button";
import { deleteItem, toggleExpand } from "../actions/items";
import { connect } from "react-redux";

class TextItem extends PureComponent {
  render() {
    var { langKey, isDuplicateKey, bungee } = this.props;
    return (
      <div
        className={
          "language-item text-item" + (!this.props.expanded ? " language-item--collapsed" : "")
        }>
        <Grid>
          <ExpandButton checked={this.props.expanded} langKey={langKey} />
          <ItemKey
            langKey={langKey}
            isDuplicateKey={isDuplicateKey}
            bungee={bungee}
            disabled={!this.props.expanded}
          />
          {this.props.expanded && (
            <React.Fragment>
              <ItemUniversal langKey={langKey} value={this.props.universal} />
              <ItemBlacklist langKey={langKey} value={this.props.blacklist} />
              <ItemDescription langKey={langKey} value={this.props.description} />
              <ItemTags
                langKey={langKey}
                tags={this.props.tags}
                universal={this.props.universal}
                bungee={bungee}
              />
              {this.props.universal !== true && (
                <ItemServers langKey={langKey} servers={this.props.servers} />
              )}
              <ItemLanguages langKey={langKey} languages={this.props.languages} />
              <DeleteItem langKey={langKey} />
            </React.Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

class SignItem extends PureComponent {
  render() {
    var { langKey, isDuplicateKey, bungee } = this.props;
    return (
      <div
        className={
          "language-item sign-item" + (!this.props.expanded ? " language-item--collapsed" : "")
        }>
        <Grid>
          <ExpandButton checked={this.props.expanded} langKey={langKey} />
          <ItemKey
            langKey={langKey}
            isDuplicateKey={isDuplicateKey}
            bungee={bungee}
            sign
            disabled={!this.props.expanded}
          />
          {this.props.expanded && (
            <React.Fragment>
              <ItemDescription langKey={langKey} value={this.props.description} />
              <ItemTags
                langKey={langKey}
                tags={this.props.tags}
                universal={this.props.universal}
                sign
                bungee={bungee}
              />
              <ItemLocations langKey={langKey} value={this.props.locations} bungee={bungee} />
              <ItemLines langKey={langKey} languages={this.props.lines || Map()} />
              <DeleteItem langKey={langKey} />
            </React.Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

const ExpandButton = connect()(
  class ExpandButton extends PureComponent {
    render() {
      return (
        <GridCell span="1">
          <IconButton
            icon="expand_less"
            onIcon="expand_more"
            checked={this.props.checked}
            onClick={() => {
              this.props.dispatch(toggleExpand(this.props.langKey));
            }}
          />
        </GridCell>
      );
    }
  }
);

const DeleteItem = connect()(
  class DeleteButton extends React.Component {
    shouldComponentUpdate() {
      return false;
    }
    render() {
      return (
        <GridCell span="1">
          <IconButton
            icon="delete_forever"
            className="accent-hover-button"
            onClick={() => {
              this.props.dispatch(deleteItem(this.props.langKey));
            }}
          />
        </GridCell>
      );
    }
  }
);

export { TextItem, SignItem };
