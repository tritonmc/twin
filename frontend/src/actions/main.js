import * as types from "../constants/ActionTypes";

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  loading,
});
