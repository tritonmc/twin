import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { List as IList, Map } from "immutable";
import { FixedSizeList as VirtualList } from "react-window";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ItemRow from "./ItemRow";
import AutoSizer from "react-virtualized-auto-sizer";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Fuse from "fuse-immutable";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "1 1 auto",
    borderRadius: theme.shape.borderRadius,
    "&::-webkit-scrollbar": {
      width: 7,
      height: 7,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.main, 0.15),
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
    },
  },
});

class ItemList extends Component {
  constructor() {
    super();
    this._renderList = this._renderList.bind(this);
  }

  render() {
    return (
      <AutoSizer defaultHeight={200} defaultWidth={300}>
        {this._renderList}
      </AutoSizer>
    );
  }

  _renderList({ width, height }) {
    return <InnerList height={height} width={width} />;
  }
}

const mapStateToProps = (state) => {
  const search = state.editor.get("search", "");
  var data;
  if (search.length === 0)
    data = state.items.get("present").map((item) => item.getIn(["_twin", "id"]));
  else {
    const fuse = new Fuse(state.items.get("present", IList()), {
      ...fuseOptions,
      keys: [
        ...fuseOptions.keys,
        ...state.main
          .get("availableLanguages")
          .flatMap((lang) => ["languages." + lang, "lines." + lang])
          .toJS(),
      ],
    });
    data = fuse.search(search);
  }
  return {
    data,
  };
};

const InnerList = withStyles(styles)(
  connect(mapStateToProps)(
    class InnerList extends Component {
      constructor() {
        super();
        this._renderVirtualList = this._renderVirtualList.bind(this);
      }

      render() {
        const { classes, height, width, data } = this.props;
        return (
          <List
            className={classes.root}
            height={height}
            width={width}
            itemData={data}
            itemCount={data.size}
            component={this._renderVirtualList}
          />
        );
      }
      _renderVirtualList(props) {
        return (
          <VirtualList itemSize={40} itemKey={this._getItemKey} {...props}>
            {ItemRow}
          </VirtualList>
        );
      }
      _getItemKey(index, data) {
        return data.get(index);
      }
    }
  )
);

const fuseOptions = {
  id: "_twin.id",
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["key", "_twin.tags", "servers"],
};

export default ItemList;
