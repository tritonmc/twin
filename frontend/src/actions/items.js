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

export const deleteItem = (id) => ({
  type: types.DELETE_ITEM,
  id,
});

export const updateSignLine = (id, language, line, value) => ({
  type: types.UPDATE_SIGN_LINE,
  id,
  language,
  line,
  value,
});

export const updateSignCoordinate = (itemId, locId, field, value) => ({
  type: types.UPDATE_SIGN_COORDINATE,
  itemId,
  locId,
  field,
  value,
});

export const deleteSignLocation = (itemId, locId) => ({
  type: types.DELETE_SIGN_LOCATION,
  itemId,
  locId,
});

export const addSignLocation = (id) => ({
  type: types.ADD_SIGN_LOCATION,
  id,
});

export const toggleArchiveState = (id, status) => ({
  type: types.TOGGLE_ARCHIVE_STATE,
  id,
  status,
});

export const addItem = (itemType, id) => ({
  type: types.ADD_ITEM,
  itemType,
  id,
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
