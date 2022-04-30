import { List, Avatar, Button, Skeleton, Space, Col } from "antd";
import { Link } from "react-router-dom";
import { getNoteDetails, getNotes } from "../../store/actions/notes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading } from "../../store/actions/shared";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import RichEditorExample from "./Editor";


import { get } from "lodash";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

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
    useEffect(() => {
        dispatch(startLoading());
        dispatch(getNotes()).then((res) => {
            console.log(res);
            setLocalState({
                initLoading: false,
                data: res,
                list: res,
              })
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
        <Space>
          <Col xs={12} sm={20} md={20} xxl={20}>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </Col>
          <Col xs={12} sm={4} md={4} xxl={4}>
            <button type="button" className="btn btn-outline-primary">
              search
            </button>
          </Col>
        </Space>
        <List
          className="demo-loadmore-list"
          loading={localState.initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={localState.data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link key={item.id} to={`/notes/${item.id}`}>Edit</Link>,
                <a key="list-loadmore-more">more</a>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={get(item, 'picture.large')} />}
                  title={<div>{get(item, "summary")}</div>}
                  description={<RichEditorExample
                    editorState={createEditorState(get(item, "data"))}
                    setEditorState={() => {}}
                    isEdit={false}
                  />}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    );
};

export default Notes;
