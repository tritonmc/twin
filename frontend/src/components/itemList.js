import React from "react";
import { connect } from "react-redux";
import ItemPreview from "./items/itemPreview";
import { List as IList, Map } from "immutable";
import Grid from "react-virtualized/dist/commonjs/Grid";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import Fuse from "fuse-immutable";

const COLUMN_WIDTH = 250;
const COLUMN_HEIGH = 150;
const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["key", "description", "preview"],
};
class ItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._columnCount = 0;
    this._rowCount = 0;
    this._cellWidth = 0;
    this._width = 1000;
    this._gridRef = React.createRef();
    this._autoSizerRef = React.createRef();

    this._cellRenderer = this._cellRenderer.bind(this);
    this._noContentRenderer = this._noContentRenderer.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderGrid = this._renderGrid.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  render() {
    return <div className="language-items-container">{this._renderAutoSizer()}</div>;
  }

  componentDidUpdate() {
    var newRowCount = Math.ceil(this.props.data.size / this._columnCount);
    if (newRowCount !== this._rowCount) {
      this._rowCount = newRowCount;
      this._autoSizerRef.current.forceUpdate();
    } else {
      this._gridRef.current.forceUpdate();
    }
  }

  _calculateColumnCount() {
    this._columnCount = Math.floor(this._width / COLUMN_WIDTH);
    if (this._columnCount === 0) this._columnCount = 1;
    this._cellWidth = this._width / this._columnCount;
  }

  _cellRenderer({ columnIndex, rowIndex, key, style }) {
    var index = rowIndex * this._columnCount + columnIndex;
    var data = this.props.data.get(index, Map());
    if (data.get("type") === "text") {
      return (
        <ItemPreview
          key={key}
          title={data.get("key")}
          id={data.get("index")}
          style={style}
          description={data.get("preview", undefined)}
        />
      );
    } else if (data.get("type") === "sign") {
      return (
        <ItemPreview
          key={key}
          title={data.get("key")}
          id={data.get("index")}
          style={style}
          description={data.get("preview", undefined)}
        />
      );
    }
  }

  _onResize({ width }) {
    this._width = width - 7;

    this._calculateColumnCount();
  }

  _renderAutoSizer() {
    return (
      <AutoSizer ref={this._autoSizerRef} onResize={this._onResize}>
        {this._renderGrid}
      </AutoSizer>
    );
  }

  _noContentRenderer() {
    return <div>No items found. Add an item by clicking on the + button.</div>;
  }

  _renderGrid({ height, width }) {
    this._width = width - 7;

    this._calculateColumnCount();
    this._rowCount = Math.ceil(this.props.data.size / this._columnCount);

    return (
      <Grid
        ref={this._gridRef}
        cellRenderer={this._cellRenderer}
        columnWidth={this._cellWidth}
        columnCount={this._columnCount}
        height={height}
        noContentRenderer={this._noContentRenderer}
        overscanRowCount={2}
        rowHeight={COLUMN_HEIGH}
        rowCount={this._rowCount}
        width={width}
      />
    );
  }
}

const mapStateToProps = (state) => {
  var lang = state.items.get("previewLanguage");
  var data = state.items.getIn(["data", "present"], IList()).map((v, index) =>
    Map({
      index: index,
      uuid: v.get("uuid"),
      type: v.get("type"),
      key: v.get("key"),
      description: v.get("description"),
      preview: v.getIn([v.get("type") === "sign" ? "lines" : "languages", lang]),
    })
  );
  var fuse = new Fuse(data, fuseOptions);
  return {
    data:
      state.navigation.get("search").length === 0
        ? data
        : fuse.search(state.navigation.get("search")),
  };
};

export default connect(mapStateToProps)(ItemList);
