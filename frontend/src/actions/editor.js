import * as types from "../constants/ActionTypes";

export const setMetadata = (metadata) => ({
  type: types.SET_METADATA,
  metadata,
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
  options: {},
});

export const deleteCollection = (name) => ({
  type: types.DELETE_COLLECTION,
  name,
});
