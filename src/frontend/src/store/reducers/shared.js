import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  START_LOADING,
  STOP_LOADING,
  REDIRECT,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: "" };

    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };

    case REDIRECT:
      return { ...state, redirect: payload };

    default:
      return state;
  }
}
