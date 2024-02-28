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
              ? (a.getIn(sortFieldSplit) ?? "").localeCompare(b.getIn(sortFieldSplit) ?? "")
              : (b.getIn(sortFieldSplit) ?? 0) - (a.getIn(sortFieldSplit) ?? 0)
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
