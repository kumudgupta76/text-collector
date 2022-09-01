import { List, Avatar, Form, Input, Button, Skeleton, Space, Col } from "antd";
import { Link } from "react-router-dom";
import {
  getNoteDetails,
  getNotes,
  searchNotes,
} from "../../store/actions/notes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading } from "../../store/actions/shared";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import RichEditorExample from "./Editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { get } from "lodash";

import { UserOutlined, LockOutlined, SearchOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
const count = 3;

const Notes = () => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const state = useSelector((state) => state.note);
  const [localState, setLocalState] = useState({
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  });

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Finish:", values);
    dispatch(searchNotes(values.search)).then((res) => {
      console.log(res);
      setLocalState({
        initLoading: false,
        data: res,
        list: res,
      });
    });
  };
  useEffect(() => {
    dispatch(getNotes()).then((res) => {
      console.log(res);
      setLocalState({
        initLoading: false,
        data: res,
        list: res,
      });
    });
  }, []);

  const createEditorState = (text) => {
    console.log(typeof text, text.length);

    if (text && text.length >= 3) {
      console.log(text, JSON.parse(text));
      const d = convertFromRaw(JSON.parse(text));
      return EditorState.createWithContent(d);
    }
    return EditorState.createEmpty();
  };

  const onLoadMore = () => {
    setLocalState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      ),
    });
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     const data = this.state.data.concat(res.results);
    //     this.setState(
    //       {
    //         data,
    //         list: data,
    //         loading: false,
    //       },
    //       () => {
    //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //         // In real scene, you can using public method of react-virtualized:
    //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //         window.dispatchEvent(new Event("resize"));
    //       }
    //     );
    //   });
  };
  //   const { initLoading, loading, list } = state;
  const loadMore = null;
  // !initLoading && !loading ? (
  //   <div
  //     style={{
  //       textAlign: "center",
  //       marginTop: 12,
  //       height: 32,
  //       lineHeight: "32px",
  //     }}
  //   >
  //     <Button onClick={this.onLoadMore}>loading more</Button>
  //   </div>
  // ) : null;

  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Form.Item name="search">
          <Input
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder="Search here..."
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Search
            </Button>
          )}
        </Form.Item>
      </Form>
      <List
        className="demo-loadmore-list"
        loading={localState.initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={localState.data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link key={item.id} to={`/notes/${item.id}`}>
                Edit
              </Link>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={get(item, "picture.large")} />}
                title={<div>{get(item, "title")}</div>}
                description={
                  <ReactMarkdown
                    children={get(item, "data")}
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
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Notes;
