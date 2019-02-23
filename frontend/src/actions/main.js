import * as types from "../constants/ActionTypes";

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  loading,
});

export const setId = (id) => ({
  type: types.SET_ID,
  id,
});

export const setDrawerState = (state) => ({
  type: types.SET_DRAWER_STATE,
  state,
});

/*export const setSaved = (id) => ({
  type: types.SET_SAVED,
  id,
});*/

export const setTheme = (theme) => ({
  type: types.SET_THEME,
  theme,
});
