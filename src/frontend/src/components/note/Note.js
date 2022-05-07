import { convertFromRaw, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNoteDetails } from "../../store/actions/note";
import { startLoading } from "../../store/actions/shared";
import RichEditorExample from "./Editor";

const Note = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.note);
  const { id } = useParams();

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getNoteDetails(id)).then((res) => {
      console.log("IN component", res);
    });
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const getEditorState = (state) => {
    if (state && state.note) {
      let jsonState = JSON.stringify(state.note);
      console.log(jsonState);
      return EditorState.createWithContent(convertFromRaw(jsonState));
    }

    return EditorState.createEmpty();
  };
  console.log(state && state.note, typeof (state && state.note));
  return (
    <div>
      {JSON.stringify(state)}
      {/* <RichEditorExample
        editorState={getEditorState(state)}
        setEditorState={setEditorState}
        readOnly={false}
      /> */}
    </div>
  );
};

export default Note;
