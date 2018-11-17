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
    var { id } = this.props;
    return (
      <div className="language-item text-item">
        <Grid>
          <ItemKey id={id} />
          <ItemUniversal id={id} />
          <ItemBlacklist id={id} />
          <ItemDescription id={id} />
          <ItemTags id={id} />
          <ItemServers id={id} />
          <ItemLanguages id={id} />
        </Grid>
      </div>
    );
  }
}

class SignItem extends PureComponent {
  render() {
    var { id } = this.props;
    return (
      <div className="language-item sign-item">
        <Grid>
          <ItemKey id={id} sign />
          <ItemDescription id={id} />
          <ItemTags id={id} />
          <ItemLocations id={id} />
          <ItemLines id={id} />
        </Grid>
      </div>
    );
  }
}

export { TextItem, SignItem };
