import { combineReducers } from "redux";
import auth from "./auth";
import shared from "./shared";
import user from "./users"
import note from "./notes"

export default combineReducers({
  auth,
  shared,
  user,
  note
});
