import NoteService from "../../services/note.service";
import { CREATE_NOTE, GET_ALL_NOTE, GET_NOTE } from "./types";

export const getNoteDetails = (id) => (dispatch) => {
  return NoteService.getNote(id).then((res) => {
    dispatch({
      type: GET_NOTE,
      payload: res.data,
    });
    return res.data;
  });
};

export const getNotes = () => (dispatch) => {
  return NoteService.getAllNote().then((res) => {
    dispatch({
      type: GET_ALL_NOTE,
      payload: res.data,
    });
    return res.data;
  });
};


export const searchNotes = (query) => (dispatch) => {
    return NoteService.searchNote(query).then((res) => {
      dispatch({
        type: GET_ALL_NOTE,
        payload: res.data,
      });
      return res.data;
    });
  };

  
export const createNote = (data) => (dispatch) => {
  return NoteService.createNote(data).then((res) => {
    console.log("reson create nbote", res);
    dispatch({
      type: CREATE_NOTE,
      payload: res.data,
    });
  });
};
