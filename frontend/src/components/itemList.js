import React from "react";
import { connect } from "react-redux";
import ItemPreview from "./items/itemPreview";
import { Grid } from "@rmwc/grid";
import { List, Map } from "immutable";

class ItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isDuplicateKey = this.isDuplicateKey.bind(this);
  }

  render() {
    return <Grid className="language-items-container">{this.getItemList()}</Grid>;
  }

  getItemList() {
    var result = [];
    this.props.data.forEach((data, i) => {
      if (data.get("type") === "text") {
        result.push(
          <ItemPreview
            key={data.get("uuid")}
            title={data.get("key")}
            id={i}
            description={data.get("preview", undefined)}
          />
        );
      } else if (data.get("type") === "sign") {
        result.push(
          <ItemPreview
            key={data.get("uuid")}
            title={data.get("key")}
            id={i}
            description={data.get("preview", undefined)}
          />
        );
      }
    });
    return result;
  }

  isDuplicateKey(key) {
    return (
      this.props.data.findIndex((item) => {
        return item.get("key") === key;
      }) !== -1
    );
  }
}

const mapStateToProps = (state) => {
  var lang = state.items.get("previewLanguage");
  return {
    data: state.items.getIn(["data", "present"], List()).map((v) =>
      Map({
        uuid: v.get("uuid"),
        type: v.get("type"),
        key: v.get("key"),
        preview: v.getIn([v.get("type") === "sign" ? "lines" : "languages", lang]),
      })
    ),
    tritonVersion: state.items.get("tritonVersion"),
    bungee: state.items.get("bungee"),
  };
};

export default connect(mapStateToProps)(ItemList);
