import { GET_USERS, GET_USER, GET_NOTE, GET_ALL_NOTE, CREATE_NOTE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTE:
        return { note: payload };
    case CREATE_NOTE:
      return { note: payload };

    case GET_ALL_NOTE:
      return { notes: payload };

    default:
      return state;
  }
}
