import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

import "draft-js/dist/Draft.css";
import RichEditorExample from "./Editor";
import TestEditor from "./TestEditor";
import { createNote, getNoteDetails } from "../../store/actions/notes";
import { useInput } from "../../util/common";

function MyEditor() {
  const dispatch = useDispatch();
  const localState = useSelector((state) => state.note);

  const [summary, summaryComp] = useInput({ type: "text" });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  useEffect(() => {
    console.log("Local state changed my editor", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
},[editorState])

  const handleOnclick = () => {
    const s = editorState.getCurrentContent();
    console.log("summiting data",JSON.stringify(convertToRaw(s)));
    

    let data = {
      summary: summary,
      data: JSON.stringify(convertToRaw(s)),
    };
    dispatch(createNote(data)).then((res) => {
      console.log("Component respnisne", res);
    });
  };

  return (
    <div className="container-wrapper">
      <div className="container-inner">
        <div style={{ width: "500px" }}>
          {/* <TestEditor editorState={editorState} setEditorState={setEditorState}/> */}
          <button type="button" onClick={handleOnclick}>
            Submit
          </button>
          {summaryComp}
        </div>
        <RichEditorExample
          editorState={editorState}
          setEditorState={setEditorState}
        />

        {/* <RichEditorExample
          editorState={getEditorState(editorState)}
          setEditorState={setEditorState}
          readOnly={false}
        /> */}
      </div>
    </div>
  );
}

export default MyEditor;

// ReactDOM.render(<MyEditor />, document.getElementById('container'));
