import React, { PureComponent } from "react";
import { Grid } from "@rmwc/grid";
import ItemKey from "./items/itemKey";
import ItemUniversal from "./items/itemUniversal";
import ItemBlacklist from "./items/itemBlacklist";
import ItemDescription from "./items/itemDescription";
import ItemTags from "./items/itemTags";
import ItemServers from "./items/itemServers";
import ItemLanguages from "./items/itemLanguages";
import ItemLocations from "./items/itemLocations";
import ItemLines from "./items/itemLines";

class TextItem extends PureComponent {
  render() {
    var { langKey, isDuplicateKey, bungee } = this.props;
    return (
      <div className="language-item text-item">
        <Grid>
          <ItemKey langKey={langKey} isDuplicateKey={isDuplicateKey} bungee={bungee} />
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
        </Grid>
      </div>
    );
  }
}

class SignItem extends PureComponent {
  render() {
    var { langKey, isDuplicateKey, bungee } = this.props;
    return (
      <div className="language-item sign-item">
        <Grid>
          <ItemKey langKey={langKey} isDuplicateKey={isDuplicateKey} sign bungee={bungee} />
          <ItemDescription langKey={langKey} value={this.props.description} />
          <ItemTags
            langKey={langKey}
            tags={this.props.tags}
            universal={this.props.universal}
            sign
            bungee={bungee}
          />
          <ItemLocations langKey={langKey} value={this.props.locations} bungee={bungee} />
          <ItemLines langKey={langKey} languages={this.props.lines} />
        </Grid>
      </div>
    );
  }
}

export { TextItem, SignItem };
