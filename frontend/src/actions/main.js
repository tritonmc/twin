import * as types from "../constants/ActionTypes";

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  loading,
});

export const setId = (id) => ({
  type: types.SET_ID,
  id,
});

export const setSaved = (id) => ({
  type: types.SET_SAVED,
  id,
});
