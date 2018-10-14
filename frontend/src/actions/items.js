import * as types from "../constants/ActionTypes";

export const setData = (data, tritonVersion, bungee, availableLanguages) => ({
  type: types.SET_DATA,
  data,
  tritonVersion,
  bungee,
  availableLanguages,
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
  tag,
  id,
});
export const removeItemTag = (id, tag) => ({
  type: types.REMOVE_ITEM_TAG,
  tag,
  id,
});
export const addItemServer = (id, server) => ({
  type: types.ADD_ITEM_SERVER,
  server,
  id,
});
export const removeItemServer = (id, server) => ({
  type: types.REMOVE_ITEM_SERVER,
  server,
  id,
});
export const changeItemText = (id, language, text) => ({
  type: types.CHANGE_ITEM_TEXT,
  language,
  text,
  id,
});
export const changeSignCoordinate = (id, coordinateId, field, value) => ({
  type: types.CHANGE_SIGN_COORDINATE,
  id,
  coordinateId,
  field,
  value,
});
export const removeSignCoordinate = (id, coordinateId) => ({
  type: types.REMOVE_SIGN_COORDINATE,
  id,
  coordinateId,
});
export const addSignCoordinate = (id, location) => ({
  type: types.ADD_SIGN_COORDINATE,
  id,
  location,
});
export const changeSignLine = (id, lang, index, value) => ({
  type: types.CHANGE_SIGN_LINE,
  id,
  lang,
  index,
  value,
});
