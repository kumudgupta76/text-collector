import NoteService from "../../services/note.service";
import { CREATE_NOTE, GET_ALL_NOTE, GET_NOTE, STOP_LOADING } from "./types";

export const getNoteDetails = (id) => (dispatch) => {
  return NoteService.getNote(id).then((res) => {
    console.log("Inside note action", res);
    dispatch({
      type: GET_NOTE,
      payload: res.data,
    });
    dispatch({ type: STOP_LOADING });
    return res.data;
  });
};

export const getNotes = () => (dispatch) => {
  return NoteService.getAllNote().then((res) => {
    console.log("Inside user action", res);
    dispatch({
      type: GET_ALL_NOTE,
      payload: res.data,
    });
    dispatch({ type: STOP_LOADING });
  });
};

export const createNote = (data) => (dispatch) => {
  return NoteService.createNote(data).then((res) => {
    console.log("reson create nbote", res);
    dispatch({
      type: CREATE_NOTE,
      payload: res.data,
    });
    dispatch({ type: STOP_LOADING });
  });
};
