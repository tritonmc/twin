import Immutable, { List, Map } from "immutable";
import immutablediff from "immutablediff";

const saveV2 = (data, defaultData) => {
  var deletedItems = getDeleted(data, defaultData);
  var notEqualItems = removeDefaultsFromCollection(getNotEqualItems(data, defaultData));
  var addItems = [];
  var changedItems = {};

  notEqualItems.forEach((item) => {
    let id = item.getIn(["_twin", "id"]);
    let defaultItem = findItemFromId(defaultData, id);
    if (!defaultItem) {
      addItems.push(item);
      return;
    }
    let diff = immutablediff(removeDefaults(defaultItem), item);
    if (diff.size !== 0) changedItems[id] = diff;
  });
  return { deleted: deletedItems.toJS(), added: addItems, modified: changedItems };
};

const getDeleted = (data, defaultData) =>
  defaultData
    .filter((item) => findItemFromId(data, item.getIn(["_twin", "id"])) === undefined)
    .map((item) => item.getIn(["_twin", "id"]));

const getNotEqualItems = (data, defaultData) =>
  data.filter(
    (item) => !Immutable.is(item, findItemFromId(defaultData, item.getIn(["_twin", "id"])))
  );

const defaults = Map({
  universal: false,
  blacklist: false,
  servers: List(),
  "_twin.archived": false,
  "_twin.description": "",
  "_twin.tags": List(),
});

const removeDefaultsFromCollection = (data) => data.map(removeDefaults);

const removeDefaults = (item) => {
  defaults.forEach((value, key) => {
    if (Immutable.is(value, item.getIn(key.split(".")))) item = item.deleteIn(key.split("."));
  });
  return item;
};

const findItemFromId = (data, id) => {
  return data.find((v) => v.getIn(["_twin", "id"]) === id);
};

export default saveV2;
