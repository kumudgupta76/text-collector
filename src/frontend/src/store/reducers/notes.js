import {
  GET_USERS,
  GET_USER,
  GET_NOTE,
  GET_ALL_NOTE,
  CREATE_NOTE,
  GET_ALL_LABEL,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTE:
      return { ...state, note: payload };
    case CREATE_NOTE:
      return { ...state, note: payload };

    case GET_ALL_NOTE:
      return { ...state, notes: payload };

    case GET_ALL_LABEL:
      return { ...state, labels: payload };

    default:
      return state;
  }
}
