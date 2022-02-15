import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNoteDetails } from "../../store/actions/notes";
import { startLoading } from "../../store/actions/shared";
import RichEditorExample from "./Editor";

const createEditorState = (text) => {
    console.log(typeof text, text.length)

    if (text && text.length >= 3) {
        console.log(text, JSON.parse(text))
        const d = convertFromRaw(JSON.parse(text))
        return EditorState.createWithContent(d);
    }
    return EditorState.createEmpty();
};

const Note = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.note);
    const { id } = useParams();
    const [editorState, setEditorState] = useState(createEditorState(state && state.note ? JSON.stringify(state.note) : ''));


    useEffect(() => {
        dispatch(startLoading());
        dispatch(getNoteDetails(id)).then((res) => {
            setEditorState(createEditorState(JSON.stringify(res)));
        });
    }, []);

    return (
        <div className="container-wrapper">
            <div className="container-inner">
                <div style={{ width: '700px', background: '#F7F7F7;' }}>
                    {state && state.note && JSON.stringify(state.note).length >= 3 ? <RichEditorExample
                        editorState={editorState}
                        setEditorState={setEditorState}
                        isEdit={false}
                    /> : <div>Loading.......</div>}

{state && state.note && JSON.stringify(state.note).length >= 3 ? <RichEditorExample
                        editorState={editorState}
                        setEditorState={setEditorState}
                        isEdit={true}
                    /> : <div>Loading.......</div>}
                </div>
            </div>
        </div>
    );
};

export default Note;