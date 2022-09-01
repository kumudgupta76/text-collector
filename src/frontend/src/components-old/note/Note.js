import { Button, Col, Popover, Row, Space, Tooltip } from "antd";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import _, { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNoteDetails,createNote } from "../../store/actions/notes";
import { startLoading } from "../../store/actions/shared";
import RichEditorExample from "./Editor";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TextArea from "antd/lib/input/TextArea";
import {
  BlockOutlined,
  BoldOutlined,
  DashOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import useUndoableState from "../../custom-hooks/useUndoableState";

const Note = () => {
  const [markDown, setMarkDown] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.note);
  const { id } = useParams();

  const [readOnly, setReadOnly] = useState(true);

  const iconStyle = {
    background: "#f7f7f7",
    border: "1px solid",
    padding: "5px",
    margin: "5px",
    borderRadius: "3px",
  };

  const popoverStyle = {
    borderRadius: "3px",
  };
  
  const {
    state: doc,
    setState: setDoc,
    resetState: resetDoc,
    index: docStateIndex,
    lastIndex: docStateLastIndex,
    goBack: undoDoc,
    goForward: redoDoc,
  } = useUndoableState(markDown);
  const canUndo = docStateIndex > 0;
  const canRedo = docStateIndex < docStateLastIndex;

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getNoteDetails(id)).then((res) => {
      if(_.get(res, 'status') == 200) {
        setTitle(res.title);
        setDoc(res.data)
      }
    });
  }, []);

  const getSel = () => {
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById("mytextarea");
    // obtain the index of the first selected character
    var start = txtarea.selectionStart;
    // obtain the index of the last selected character
    var end = txtarea.selectionEnd;
    // obtain the selected text
    var sel = txtarea.value.substring(start, end);
    // do something with the selected content
    return [sel, start, end];
  };
  // const operations = _.map(['Bold', 'Italic', 'Underline', 'Strikethrough', 'Dash', 'OrderedList', 'UnorderedList', 'Redo', 'Undo'], (op) => {
  //   let operation = {
  //     name:op,
  //     style: popoverStyle,
  //   }

  //   if(op == 'Redo') {
  //     operation.style = {...popoverStyle, marginLeft:"auto"}
  //   }
  //   return operation;
  // })
  const textOperation = (type) => {
    const [sel, start, end] = getSel();
    let startStr = doc.text.substring(0, start);
    let endStr = doc.text.substring(end);
    console.log(sel, start, end);
    switch (type) {
      case "bold":
        setDoc({ text: `${startStr}**${sel}**${endStr}` });
        break;
      case "italic":
        setDoc({ text: `${startStr}*${sel}*${endStr}` });
        break;
      case "strikethrough":

      default:
        break;
    }
  };

  const handleSubmit = (title, text) => {
    let data = {
      title: title,
      data: text,
    };
    dispatch(createNote(data)).then((res) => {
      console.log("Component response", res);
    });
  }
  return (
    <>
      <Row gutter={[16, 24]}>
        <Col span={24}><Row
            style={{
              border: "1px solid",
              borderRadius: "3px",
            }}
          >
            <TextArea
              id="mytextarea"
              value={title}
              onChange={(event) => setTitle(event.target.value )}
            ></TextArea>
          </Row></Col>
        <Col xs={24} md={12}>
          <Row style={{ border: "1px solid", borderRadius: "3px" }}>
            <Tooltip title="Bold" style={popoverStyle}>
              <BoldOutlined
                style={iconStyle}
                onClick={() => textOperation("bold")}
              ></BoldOutlined>
            </Tooltip>
            <Tooltip title="Italic" style={popoverStyle}>
              <ItalicOutlined
                style={iconStyle}
                onClick={() => textOperation("italic")}
              ></ItalicOutlined>
            </Tooltip>
            <Tooltip title="UnderLine" style={popoverStyle}>
              <UnderlineOutlined style={iconStyle}></UnderlineOutlined>
            </Tooltip>
            <Tooltip title="StrikeThrough" style={popoverStyle}>
              <StrikethroughOutlined style={iconStyle}></StrikethroughOutlined>
            </Tooltip>
            <Tooltip title="Dashed" style={popoverStyle}>
              <DashOutlined style={iconStyle}></DashOutlined>
            </Tooltip>
            <Tooltip title="UnorderdedList" style={popoverStyle}>
              <UnorderedListOutlined style={iconStyle}></UnorderedListOutlined>
            </Tooltip>
            <Tooltip title="OrderedList" style={popoverStyle}>
              <OrderedListOutlined style={iconStyle}></OrderedListOutlined>
            </Tooltip>
            <Tooltip title="Redo" style={popoverStyle}>
              <RedoOutlined
                style={{ ...iconStyle, marginLeft: "auto" }}
                onClick={() => redoDoc()}
                disabled={!canRedo}
              ></RedoOutlined>
            </Tooltip>
            <Tooltip title="Undo" style={popoverStyle}>
              <UndoOutlined
                style={iconStyle}
                onClick={() => undoDoc()}
                disabled={!canUndo}
              ></UndoOutlined>
            </Tooltip>
          </Row>
          <Row
            style={{
              border: "1px solid",
              borderRadius: "3px",
              marginTop: "10px",
              minHeight: "300px",
            }}
          >
            <TextArea
              id="mytextarea"
              value={doc.text}
              onChange={(event) => setDoc({ text: event.target.value })}
              rows={6}
            ></TextArea>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <Row style={{ border: "1px solid", borderRadius: "3px" }}>
            <Col className="center">
              <div>Preview</div>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid",
              borderRadius: "3px",
              marginTop: "10px",
              minHeight: "300px",
            }}
          >
            <Col>
              <ReactMarkdown
                children={doc.text}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        // style={dark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Space style={{ padding: "10px", float: "right" }}>
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
            onClick={() => handleSubmit(title, doc.text)}
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
