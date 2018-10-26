var Immutable = require("immutable");

const defaultFields = {
  archived: false,
  description: "",
  universal: false,
  servers: Immutable.List(),
  tags: Immutable.List(),
  blacklist: false,
};

const calculateChanges = (data, defaultData, bungee) => {
  var deleted = [];
  var added = [];
  var modified = {};
  var checkedKeys = [];

  var defaultDataMap = {};
  defaultData.forEach((data) => {
    defaultDataMap[data.get("key")] = data;
  });

  data.forEach((data) => {
    let key = data.get("key");
    let object = removeUnwantedProperties(data, bungee);
    if (defaultDataMap[key]) {
      let defaultObj = defaultDataMap[key];
      if (
        object.find((v, k) => {
          return defaultObj.has(k)
            ? !Immutable.is(v, defaultObj.get(k))
            : !Immutable.is(v, defaultFields[k]);
        }) !== undefined
      )
        modified[key] = removeDefaultFields(object.toJS());
    } else {
      added.push(removeDefaultFields(object.toJS()));
    }
    checkedKeys.push(key);
  });

  Object.keys(defaultDataMap).forEach((key) => !checkedKeys.includes(key) && deleted.push(key));
  return { deleted, added, modified };
};

function removeDefaultFields(object) {
  Object.entries(defaultFields).forEach(([key, value]) => {
    if (value instanceof Immutable.List && object[key] && object[key].length === 0)
      object[key] = undefined;
    if (object[key] === value) object[key] = undefined;
  });
  return object;
}

function removeUnwantedProperties(data, bungee) {
  var obj = {};
  if (data.get("type") === "text") {
    obj = Immutable.Map({
      type: "text",
      key: data.get("key", ""),
      languages: data.get("languages", Immutable.List()),
      archived: data.get("archived", false),
      description: data.get("description", ""),
      tags: data.get("tags", Immutable.List()),
    });
  } else if (data.get("type") === "sign") {
    obj = Immutable.Map({
      type: "sign",
      key: data.get("key", ""),
      lines: data.get("lines", Immutable.List()),
      locations: data.get("locations", Immutable.List()),
      archived: data.get("archived", false),
      description: data.get("description", ""),
      tags: data.get("tags", Immutable.List()),
    });
  } else {
    console.warn("INVALID TYPE FOR OBJECT: " + data.get("type"));
    console.warn(data);
    obj = Immutable.Map();
  }
  if (bungee) {
    obj = obj.merge({
      universal: data.get("universal", false),
      servers: data.get("servers", Immutable.List()),
      blacklist: data.get("blacklist", false),
    });
  }
  return obj;
}

export default calculateChanges;
