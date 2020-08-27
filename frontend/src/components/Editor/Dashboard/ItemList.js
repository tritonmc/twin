import { Paper, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import Fuse from "fuse-immutable";
import { List as IList } from "immutable";
import React, { Component } from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as VirtualList } from "react-window";
import ItemRow from "./ItemRow";
import SelectionToolbar from "./SelectionToolbar";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "1 1 auto",
    borderRadius: theme.shape.borderRadius,
  },
  list: {
    paddingBottom: 20,
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
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  warningNoItems: {
    fontSize: "calc(16px + 1vw)",
    fontWeight: 300,
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
});

class ItemList extends Component {
  constructor() {
    super();
    this._renderList = this._renderList.bind(this);
  }

  render() {
    return (
      <AutoSizer
        archivedOnly={this.props.archivedOnly}
        tag={this.props.tag}
        collection={this.props.collection}
        defaultHeight={200}
        defaultWidth={300}>
        {this._renderList}
      </AutoSizer>
    );
  }

  _renderList({ width, height }) {
    return (
      <InnerList
        archivedOnly={this.props.archivedOnly}
        tag={this.props.tag}
        collection={this.props.collection}
        height={height}
        width={width}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const search = state.editor.get("search", "");
  var sortField = state.editor.getIn(["sort", "field"]).split(".");
  var sortText = state.editor.getIn(["sort", "text"]);
  var data = state.items
    .get("present", IList())
    .filter((item) => {
      if (ownProps.collection) return item.get("fileName") === ownProps.collection;
      if (ownProps.tag) return item.getIn(["_twin", "tags"], IList()).indexOf(ownProps.tag) !== -1;
      return item.getIn(["_twin", "archived"], false) === ownProps.archivedOnly;
    })
    .sort((a, b) =>
      sortText
        ? a.getIn(sortField).localeCompare(b.getIn(sortField))
        : b.getIn(sortField) - a.getIn(sortField)
    );
  if (search.length === 0) data = data.map((item) => item.getIn(["_twin", "id"]));
  else {
    const fuse = new Fuse(data, {
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
        if (data.size === 0) {
          return (
            <Paper className={classNames(classes.root, classes.paper)} style={{ height, width }}>
              <Typography variant="body1" className={classes.warningNoItems}>
                No items found
                <br />
                You can add an item by clicking the + button above
              </Typography>
            </Paper>
          );
        }
        return (
          <div className={classes.root} style={{ width, height }}>
            <SelectionToolbar visibleItems={data} />
            <List
              className={classes.list}
              height={height - 37}
              width={width}
              itemData={data}
              itemCount={data.size}
              component={this._renderVirtualList}
            />
          </div>
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
  threshold: 0.2,
  location: 0,
  distance: 1000,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["key", "_twin.tags", "servers"],
};

export default ItemList;
