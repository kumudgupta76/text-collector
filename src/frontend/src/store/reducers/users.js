import { GET_USERS, GET_USER } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return { user: payload };

    case GET_USERS:
      return { users: payload };

    default:
      return state;
  }
}
