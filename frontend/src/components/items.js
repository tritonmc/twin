import React, { PureComponent } from "react";
import { Grid } from "@rmwc/grid";
import ItemKey from "./items/itemKey";
import ItemUniversal from "./items/itemUniversal";
import ItemBlacklist from "./items/itemBlacklist";
import ItemDescription from "./items/itemDescription";
import ItemTags from "./items/itemTags";
import ItemServers from "./items/itemServers";
import ItemLanguages from "./items/itemLanguages";

class TextItem extends PureComponent {
  render() {
    var { langKey } = this.props;
    return (
      <div className="language-item text-item">
        <Grid>
          <ItemKey langKey={langKey} />
          <ItemUniversal langKey={langKey} value={this.props.universal} />
          <ItemBlacklist langKey={langKey} value={this.props.blacklist} />
          <ItemDescription langKey={langKey} value={this.props.description} />
          <ItemTags langKey={langKey} tags={this.props.tags} universal={this.props.universal} />
          {this.props.universal !== true && (
            <ItemServers langKey={langKey} servers={this.props.servers} />
          )}
          <ItemLanguages langKey={langKey} languages={this.props.languages} />
        </Grid>
      </div>
    );
  }
}

export default TextItem;
