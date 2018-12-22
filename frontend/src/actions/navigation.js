import * as types from "../constants/ActionTypes";

export const setSearch = (search) => ({
  type: types.SET_SEARCH,
  search,
});
