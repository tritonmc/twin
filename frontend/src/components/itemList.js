import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TextItem, SignItem } from "./items";

class ItemList extends PureComponent {
  constructor(props) {
    super(props);
    this.isDuplicateKey = this.isDuplicateKey.bind(this);
  }

  render() {
    return <div className="language-items-container">{this.getItemList()}</div>;
  }

  getItemList() {
    var result = [];
    this.props.data.forEach((data, i) => {
      if (i !== 0) result.push(<hr key={i} />);
      if (data.get("type") === "text") {
        result.push(
          <TextItem
            key={data.get("key")}
            languages={data.get("languages")}
            langKey={data.get("key")}
            description={data.get("description")}
            universal={data.get("universal")}
            tags={data.get("tags")}
            servers={data.get("servers")}
            blacklist={data.get("blacklist")}
            bungee={this.props.bungee}
            isDuplicateKey={this.isDuplicateKey}
          />
        );
      } else if (data.get("type") === "sign") {
        result.push(
          <SignItem
            key={data.get("key")}
            lines={data.get("lines")}
            locations={data.get("locations")}
            langKey={data.get("key")}
            description={data.get("description")}
            tags={data.get("tags")}
            bungee={this.props.bungee}
            isDuplicateKey={this.isDuplicateKey}
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
  var root = state.items.itemListRoot;
  return {
    data: root.get("data"),
    tritonVersion: root.get("tritonVersion"),
    bungee: root.get("bungee"),
  };
};

export default connect(mapStateToProps)(ItemList);
