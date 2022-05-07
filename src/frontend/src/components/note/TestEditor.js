import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function MyEditor({editorState, setEditorState}) {
  

  return <Editor editorState={editorState} onChange={setEditorState} />;
}

// ReactDOM.render(<MyEditor />, document.getElementById('container'));