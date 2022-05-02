import { Button, Space } from "antd";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNoteDetails } from "../../store/actions/notes";
import { startLoading } from "../../store/actions/shared";
import RichEditorExample from "./Editor";

const createEditorState = (text) => {
  console.log(typeof text, text.length);

  if (text && text.length >= 3) {
    console.log(text, JSON.parse(text));
    const d = convertFromRaw(JSON.parse(text));
    return EditorState.createWithContent(d);
  }
  return EditorState.createEmpty();
};

const Note = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.note);
  const { id } = useParams();
  const [editorState, setEditorState] = useState(
    createEditorState(state && state.note ? JSON.stringify(state.note) : "")
  );
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getNoteDetails(id)).then((res) => {
      setEditorState(createEditorState(JSON.stringify(res)));
    });
  }, []);

  return (
    <>
      {JSON.stringify(get(state, "note", {})).length < 3 ? (
        <div>Loading.......</div>
      ) : (
        <RichEditorExample
          editorState={editorState}
          setEditorState={setEditorState}
          isEdit={!readOnly}
        />
      )}
      <Space style={{ padding: '10px', float:'right'}}>
        <Button 
          type="primary"
          onClick={() => setReadOnly(!readOnly)}
          size="small"
        >
          {readOnly ? "Edit" : "Preview"}
        </Button>
        {!readOnly && (
          <Button
            type="primary"
            onClick={() => console.log("sumit")}
            style={{ float: "right" }}
            size="small"
          >
            Update
          </Button>
        )}
      </Space>
    </>
  );
};

export default Note;
