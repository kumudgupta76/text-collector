import { Editor, convertFromRaw, EditorState, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNoteDetails } from "../../store/actions/note";
import { startLoading } from "../../store/actions/shared";
import RichEditorExample from "./Editor";


const createState = (text) => {
    console.log(typeof text, text.length)
    
    if(text && text.length >=3) {
    console.log(text, JSON.parse(text))
    const d = convertFromRaw(JSON.parse(text))
    return EditorState.createWithContent(d);
    }
    return EditorState.createEmpty();
    // else
    // return 
  };
  
  const ControlledEditor = ({ rawState }) => {
    // define the local state, using the createState callback to create the initial value
    const [editorState, setEditorState] = useState(createState(rawState));
  
    // override the local state any time that the props change
    useEffect(() => {
        console.log("Global state changes", rawState)
      setEditorState(createState(rawState));
    }, [rawState]);
  
    useEffect(() => {
        console.log("Local state changed", convertToRaw(editorState.getCurrentContent()));
    },[editorState])
    return (
      <Editor
        editorState={editorState}
        onChange={setEditorState}
      />
    );
  };


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


  console.log(state && state.note, typeof (state && state.note));
  return (
    <div>
      {JSON.stringify(state)}
      {/* <RichEditorExample
        editorState={getEditorState(state)}
        setEditorState={setEditorState}
        readOnly={false}
      /> */}
       <ControlledEditor rawState={state && state.note ? JSON.stringify(state.note) : ''} />
    </div>
  );
};

export default Note;