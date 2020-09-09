import * as types from "../constants/ActionTypes";

export const setItems = (data) => ({
  type: types.SET_ITEMS,
  data,
});

export const updateField = (index, path, value) => ({
  type: types.UPDATE_FIELD,
  index,
  path,
  value,
});

export const deleteItem = (id) => ({
  type: types.DELETE_ITEM,
  id,
});

export const updateSignLine = (index, language, line, value) => ({
  type: types.UPDATE_SIGN_LINE,
  index,
  language,
  line,
  value,
});

export const updateSignCoordinate = (index, locId, field, value) => ({
  type: types.UPDATE_SIGN_COORDINATE,
  index,
  locId,
  field,
  value,
});

export const deleteSignLocation = (index, locId) => ({
  type: types.DELETE_SIGN_LOCATION,
  index,
  locId,
});

export const addSignLocation = (index) => ({
  type: types.ADD_SIGN_LOCATION,
  index,
});

export const toggleArchiveState = (id, status) => ({
  type: types.TOGGLE_ARCHIVE_STATE,
  id,
  status,
});

export const addItem = (itemType, id, collection) => ({
  type: types.ADD_ITEM,
  itemType,
  id,
  collection,
});

export const addPattern = (id) => ({
  type: types.ADD_PATTERN,
  id,
});

export const deletePattern = (id, index) => ({
  type: types.DELETE_PATTERN,
  id,
  index,
});

export const importTranslations = (language, translations) => ({
  type: types.IMPORT_TRANSLATIONS,
  language,
  translations,
});

export const moveCollectionBulk = (items, collection) => ({
  type: types.MOVE_COLLECTION_BULK,
  items,
  collection,
});
