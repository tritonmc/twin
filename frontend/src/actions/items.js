import * as types from "../constants/ActionTypes";

export const setData = (data, tritonVersion, availableLanguages) => ({
  type: types.SET_DATA,
  data,
  tritonVersion,
  availableLanguages,
});
export const changeItemType = (id, newType) => ({
  type: types.CHANGE_ITEM_TYPE,
  oldType: "text",
  id,
  newType,
});
export const changeItemField = (fieldName, id, value) => ({
  type: types.CHANGE_ITEM_FIELD,
  id,
  fieldName,
  value,
});
export const changeItemKey = (oldKey, newKey) => changeItemField("key", oldKey, newKey);
export const changeItemUniversal = (id, universal) => changeItemField("universal", id, universal);
export const changeItemBlacklist = (id, blacklist) => changeItemField("blacklist", id, blacklist);
export const changeItemDescription = (id, description) =>
  changeItemField("description", id, description);
export const addItemTag = (id, tag) => ({
  type: types.ADD_ITEM_TAG,
  oldType: "text",
  tag,
  id,
});
export const removeItemTag = (id, tag) => ({
  type: types.REMOVE_ITEM_TAG,
  oldType: "text",
  tag,
  id,
});
export const addItemServer = (id, server) => ({
  type: types.ADD_ITEM_SERVER,
  oldType: "text",
  server,
  id,
});
export const removeItemServer = (id, server) => ({
  type: types.REMOVE_ITEM_SERVER,
  oldType: "text",
  server,
  id,
});
export const changeItemText = (id, language, text) => ({
  type: types.CHANGE_ITEM_TEXT,
  language,
  text,
  id,
});
