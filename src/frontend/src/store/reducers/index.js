import { combineReducers } from "redux";
import auth from "./auth";
import shared from "./shared";
import user from "./users"

export default combineReducers({
  auth,
  shared,
  user,
});
