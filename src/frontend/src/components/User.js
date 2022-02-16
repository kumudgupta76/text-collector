import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { startLoading } from "../store/actions/shared";
import { getUserDetails } from "../store/actions/users";
import { Layout } from "antd";
import { Form, Input, Button, Radio, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import _ from "lodash";

const { Content } = Layout;

const User = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  //   const [summary, summaryComp] = useInput({ type: "text" });
  const [user, setUser] = useState({});
  const [readOnly, setReadOnly] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(startLoading());
    dispatch(getUserDetails(15)).then((res) => {
      setUser(res);
    });
  }, []);

  const saveUserDetails = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <div className="site-layout-background">
      <div className="main-content">
        {JSON.stringify(state)}

        <Row>
          <Col xs={2} md={8}></Col>
          <Col xs={20} md={8}>
            <div className="container">
              <Form form={form} layout="vertical">
                <Form.Item label="Username">
                  <Input
                    value={_.get(state, "user.username")}
                    disabled={readOnly}
                  />
                </Form.Item>
                <Form.Item label="Full Name">
                  <Input
                    value={_.get(state, "user.name")}
                    disabled={readOnly}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  tooltip={{
                    title: "Required used for login",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input
                    value={_.get(state, "user.email")}
                    disabled={readOnly}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={() => setReadOnly(!readOnly)} size="small">
                    {readOnly ? "Edit" : "Preview"}
                  </Button>
                  {!readOnly && (
                    <Button
                      type="primary"
                      onClick={() => saveUserDetails()}
                      style={{ float: "right" }}
                      size="small"
                    >
                      Update
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col xs={2} md={8}></Col>
        </Row>
      </div>
    // </div>
  );
};

export default User;
