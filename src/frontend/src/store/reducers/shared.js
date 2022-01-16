import { SET_MESSAGE, CLEAR_MESSAGE, START_LOADING, STOP_LOADING } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    case START_LOADING:
      return {loading:true};
    case STOP_LOADING:
      return {loading:false};

    default:
      return state;
  }
}