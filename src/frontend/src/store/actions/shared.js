import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  START_LOADING,
  STOP_LOADING,
  REDIRECT,
} from "./types";

export const setMessage = (text, type = "info") => ({
  type: SET_MESSAGE,
  payload: { text: text, type: type },
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});

export const redirect = (path) => ({
  type: REDIRECT,
  payload: { path: path },
});
