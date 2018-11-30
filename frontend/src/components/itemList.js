import React from "react";
import { connect } from "react-redux";
import ItemPreview from "./items/itemPreview";
//import { Grid } from "@rmwc/grid";
import { List as IList, Map } from "immutable";
import Collection from "react-virtualized/dist/commonjs/Collection";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

const GUTTER_SIZE = 10;
const CELL_WIDTH = 500;

class ItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isDuplicateKey = this.isDuplicateKey.bind(this);

    this._columnYMap = [];
    this._columnCount = 4;
    this._currentWidth = 1000;
    this._cellWidth = 250;

    this.collection = React.createRef();
    this.shouldRecomputeCollection = false;

    this._autoSizerResize = this._autoSizerResize.bind(this);
    this._cellRenderer = this._cellRenderer.bind(this);
    this._getColumnWidth = this._getColumnWidth.bind(this);
    this._cellSizeAndPositionGetter = this._cellSizeAndPositionGetter.bind(this);
    this._getRowHeight = this._getRowHeight.bind(this);
    this._noContentRenderer = this._noContentRenderer.bind(this);
  }

  render() {
    this._columnYMap = [];
    //return <Grid className="language-items-container">{this.getItemList()}</Grid>;
    return (
      <AutoSizer className="language-items-container" onResize={this._autoSizerResize}>
        {({ width, height }) => {
          this._currentWidth = width;
          this._columnCount = Math.floor(width / 250);
          if (this._columnCount === 0) this._columnCount = 1;
          this._cellWidth =
            (this._currentWidth - GUTTER_SIZE * (this._columnCount - 1)) / this._columnCount;
          console.log(this._currentWidth);
          console.log(this._columnCount);
          console.log(this._cellWidth);
          return (
            <Collection
              ref={this.collection}
              cellCount={this.props.data.size}
              cellRenderer={this._cellRenderer}
              cellSizeAndPositionGetter={this._cellSizeAndPositionGetter}
              height={height}
              noContentRenderer={this._noContentRenderer}
              verticalOverscanSize={4}
              rowHeight={this._getRowHeight}
              width={width}
            />
          );
        }}
      </AutoSizer>
    );
  }

  _autoSizerResize({ height, width }) {
    if (this._currentWidth === 0 && width !== 0)
      this.collection.current.recomputeCellSizesAndPositions();
  }

  _cellSizeAndPositionGetter({ index }) {
    const columnPosition = index % (this._columnCount || 1);
    const datum = this.props.data.get(index);

    const height = /*datum.size*/ 100;
    //const width = CELL_WIDTH;
    const width = this._cellWidth;
    const x = columnPosition * (GUTTER_SIZE + width);
    const y = this._columnYMap[columnPosition] || 0;

    this._columnYMap[columnPosition] = y + height + GUTTER_SIZE;

    return {
      height,
      width,
      x,
      y,
    };
  }

  _cellRenderer({ index, key, style }) {
    var i = index;
    var data = this.props.data.get(i, Map());
    console.log(index + " " + data);
    if (data.get("type") === "text") {
      return (
        <ItemPreview
          key={data.get("uuid")}
          title={data.get("key")}
          id={i}
          style={style}
          description={data.get("preview", undefined)}
        />
      );
    } else if (data.get("type") === "sign") {
      return (
        <ItemPreview
          key={data.get("uuid")}
          title={data.get("key")}
          id={i}
          style={style}
          description={data.get("preview", undefined)}
        />
      );
    }
  }

  _getColumnWidth({ index }) {
    return 100;
  }

  _noContentRenderer() {
    return <div>Add an item by clicking on the + button.</div>;
  }

  _getRowHeight() {
    return 100;
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
    data: state.items.getIn(["data", "present"], IList()).map((v) =>
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
