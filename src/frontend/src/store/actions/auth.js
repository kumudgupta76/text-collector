import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "../actions/types";

import AuthService from "../../services/auth.service";
import { setMessage, stopLoading } from "./shared";
import { message } from "../../util/common";

export const signup = (data) => (dispatch) => {
  return AuthService.signup(data).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      });

      dispatch({
        type: SET_MESSAGE,
        message: "User regiested success full !",
        message_type: "SUCCESS",
      });

      return Promise.resolve();
    },
    (error) => {
      const text =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch(setMessage(text, "error"));

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      dispatch(setMessage("User Logged in successfull !", "success"));

      dispatch(stopLoading());
      return Promise.resolve();
    },
    (error) => {
      const text =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch(setMessage(text, "error"));

      dispatch(stopLoading());
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
  dispatch(setMessage("Logout successfull!", "success"));
  window.location.reload();
};
