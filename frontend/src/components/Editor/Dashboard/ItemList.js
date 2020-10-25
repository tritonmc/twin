import Fuse from "fuse-immutable";
import { useEditorSettings } from "hooks/useEditorSettings";
import { List as IList } from "immutable";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import InnerList from "./InnerList";

const ItemList = ({ archivedOnly = false, tag, collection }) => {
  const { search, setLoading, languages } = useEditorSettings();
  const { translations, sortField, sortText } = useSelector((state) => ({
    sortField: state.editor.getIn(["sort", "field"]),
    sortText: state.editor.getIn(["sort", "text"]),
    translations: state.items.get("present", IList()),
  }));
  const [filteredKeys, setFilteredKeys] = useState([]);

  const fuseKeys = useMemo(
    () => languages.flatMap((lang) => [`languages.${lang}`, `lines.${lang}`]),
    [languages]
  );

  useEffect(() => {
    const filteredTranslations = translations.filter((item) => {
      if (collection) return item.get("fileName") === collection;
      if (tag) return item.getIn(["_twin", "tags"], IList()).indexOf(tag) !== -1;
      return item.getIn(["_twin", "archived"], false) === archivedOnly;
    });

    if (search.length === 0) {
      const sortFieldSplit = sortField.split(".");
      setFilteredKeys(
        filteredTranslations
          .sort((a, b) =>
            sortText
              ? a.getIn(sortFieldSplit).localeCompare(b.getIn(sortFieldSplit))
              : b.getIn(sortFieldSplit) - a.getIn(sortFieldSplit)
          )
          .map((item) => item.getIn(["_twin", "id"]))
      );
      return;
    }
    //setLoading(true);
    const fuse = new Fuse(filteredTranslations, {
      ...fuseOptions,
      keys: [...fuseOptions.keys, ...fuseKeys],
    });
    setFilteredKeys(fuse.search(search));
    //setLoading(false);
  }, [
    search,
    translations,
    sortText,
    setLoading,
    collection,
    tag,
    archivedOnly,
    fuseKeys,
    sortField,
  ]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <InnerList width={width} height={height} filteredKeys={filteredKeys} />
      )}
    </AutoSizer>
  );
};

/*export default ItemList;

class ItemList extends Component {
  constructor() {
    super();
    this._renderList = this._renderList.bind(this);
  }

  render() {
    return (
      <AutoSizer
        archivedOnly={this.props.archivedOnly || false}
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
        archivedOnly={this.props.archivedOnly || false}
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
);*/

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
