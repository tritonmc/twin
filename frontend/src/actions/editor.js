import * as types from "../constants/ActionTypes";

export const setPreviewLanguage = (language) => ({
  type: types.SET_PREVIEW_LANGUAGE,
  language,
});

export const setMetadata = (metadata) => ({
  type: types.SET_METADATA,
  metadata,
});

export const setSearch = (search) => ({
  type: types.SET_SEARCH,
  search,
});

export const openEditor = (item) => ({
  type: types.OPEN_EDITOR,
  item,
});

export const closeEditor = () => ({
  type: types.CLOSE_EDITOR,
});

export const addTag = (tag) => ({
  type: types.ADD_TAG,
  tag,
});

export const setSort = (field, text) => ({
  type: types.SET_SORT,
  field,
  text,
});

export const toggleSelected = (id) => ({
  type: types.TOGGLE_SELECT,
  id,
});

export const setAllSelected = (selected, id) => ({
  type: types.SET_ALL_SELECT,
  id,
  selected,
});

export const addCollection = (name) => ({
  type: types.ADD_COLLECTION,
  name,
});
