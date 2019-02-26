import * as types from "../constants/ActionTypes";

export const setItems = (data) => ({
  type: types.SET_ITEMS,
  data,
});

export const updateField = (id, path, value) => ({
  type: types.UPDATE_FIELD,
  id,
  path,
  value,
});

/*export const changeItemField = (fieldName, id, value) => ({
  type: types.CHANGE_ITEM_FIELD,
  id,
  fieldName,
  value,
});
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
export const addItem = (type) => ({
  type: types.ADD_ITEM,
  itemType: type,
});
export const deleteItem = (id) => ({
  type: types.DELETE_ITEM,
  id,
});
export const toggleExpand = (id) => ({
  type: types.TOGGLE_EXPAND,
  id,
});
export const setActiveItem = (item) => ({
  type: types.SET_ACTIVE_ITEM,
  item,
});*/
