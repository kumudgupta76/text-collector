import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

import "draft-js/dist/Draft.css";
import RichEditorExample from "./Editor";
import TestEditor from "./TestEditor";
import { createNote, getNoteDetails } from "../../store/actions/note";
import { useInput } from "../../util/common";

function MyEditor() {
  const dispatch = useDispatch();
  const localState = useSelector((state) => state.note);

  const [summary, summaryComp] = useInput({ type: "text" });

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleOnclick = () => {
    const s = editorState.getCurrentContent();
    console.log(convertToRaw(s));

    let data = {
      summary: summary,
      data: JSON.stringify(s),
    };
    dispatch(createNote(data)).then((res) => {
      console.log("Component respnisne", res);
    });
  };

  const getEditorState = (state) => {
      
    // if(state && state.note ) {
    //     let jsonState = JSON.parse(JSON.stringify(state.note))
    //     return EditorState.createWithContent(convertFromRaw(jsonState));
    // }

    // return EditorState.createEmpty();

    let s = JSON.stringify(state.getCurrentContent());
    return EditorState.createWithContent(convertFromRaw(JSON.parse(s)));
  }
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
          readOnly={true}
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
