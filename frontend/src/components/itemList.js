import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TextItem from "./items";

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
            availableLanguages={this.props.availableLanguages}
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
    availableLanguages: root.get("availableLanguages"),
  };
};

export default connect(mapStateToProps)(ItemList);
