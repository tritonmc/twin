import * as types from "../constants/ActionTypes";

export const setPage = (page) => ({
  type: types.SET_PAGE,
  page,
});

export const nextPage = () => ({
  type: types.NEXT_PAGE,
});

export const previousPage = () => ({
  type: types.PREVIOUS_PAGE,
});
