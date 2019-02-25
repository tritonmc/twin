import * as types from "../constants/ActionTypes";

export const setPreviewLanguage = (language) => ({
  type: types.SET_PREVIEW_LANGUAGE,
  language,
});
