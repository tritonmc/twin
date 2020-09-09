import { List, Map, is as immutableIs } from "immutable";
import immutablediff from "immutablediff";

const saveV2 = (data, defaultData, metadata, tritonv) => {
  const defaultDataObject = {};
  defaultData.forEach((item) => (defaultDataObject[item.getIn(["_twin", "id"])] = item));

  const deletedItems = getDeleted(data, Object.keys(defaultDataObject));
  const addItems = [];
  const changedItems = {};

  const defaults = Map({
    blacklist: tritonv >= 5,
    servers: List(),
    "_twin.archived": false,
    "_twin.description": "",
    "_twin.tags": List(),
  });

  data.forEach((item) => {
    const id = item.getIn(["_twin", "id"]);
    if (!defaultDataObject[id]) return addItems.push(item);

    const sanitizedItem = removeDefaults(item, defaults);
    const sanitizedDefault = removeDefaults(defaultDataObject[id], defaults);
    if (immutableIs(sanitizedItem, sanitizedDefault)) return;

    const diff = immutablediff(sanitizedDefault, sanitizedItem);
    if (diff.size !== 0) changedItems[id] = diff;
  });

  if (tritonv >= 4)
    return {
      deleted: deletedItems,
      added: addItems,
      modified: changedItems,
      metadata,
    };
  return { deleted: deletedItems, added: addItems, modified: changedItems };
};

const getDeleted = (data, defaultIds) => {
  const ids = new Set(data.map((item) => item.getIn(["_twin", "id"])));
  return defaultIds.filter((id) => !ids.has(id));
};

const removeDefaults = (item, defaults) => {
  defaults.forEach((value, key) => {
    if (immutableIs(value, item.getIn(key.split(".")))) item = item.deleteIn(key.split("."));
  });
  return item;
};

export default saveV2;
