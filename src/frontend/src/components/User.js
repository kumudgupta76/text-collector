import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/actions/users";
import { Layout, Spin } from "antd";
import { Form, Input, Button, Radio, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import _ from "lodash";

const { Content } = Layout;

const User = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => _.pick(state, ['user', 'shared']));
    //   const [summary, summaryComp] = useInput({ type: "text" });
    const [user, setUser] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [form] = Form.useForm();
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (_.get(user, "id")) {
            dispatch(getUserDetails(user.id)).then((res) => {
                setUser(res);

            });
        }

    }, []);

    const saveUserDetails = (values) => {
        console.log("Success:", form.getFieldsValue(), values);
    };

    // const getUserDetail = () => {
    //             let user = JSON.parse(localStorage.getItem("user"))
    //     if (_.get(user, "id")) {
    //         dispatch(getUserDetails(user.id)).then((res) => {
    //             setUser(res);

    //         });
    //     }
    // };
    // if(!_.get(state, 'user.user')) {
    //     getUserDetail();
    // }
    console.log(state, _.get(state, 'user.user'));
    return _.get(state, 'shared.loading') ? <Spin tip="Loading..."></Spin> : (
        <Row>
            <Col xs={2} md={8}></Col>
            <Col xs={20} md={8}>
                <div className="container-wrapper">
                    <div className="container-inner">
                        <Form form={form} layout="vertical" onFinish={saveUserDetails}>
                            <Form.Item label="Username">
                                <Input
                                    value={_.get(state, "user.user.username")}
                                    disabled={readOnly}
                                    onChange={(value) => form.setFieldsValue({'username':value})}
                                />
                            </Form.Item>
                            <Form.Item label="Full Name">
                                <Input
                                    value={_.get(state, "user.user.name")}
                                    disabled={readOnly}
                                    onChange={(value) => form.setFieldsValue({'name':value})}
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
                                    value={_.get(state, "user.user.email")}
                                    disabled={readOnly}
                                    onChange={(value) => form.setFieldsValue({'email':value})}

                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={() => setReadOnly(!readOnly)} size="small">
                                    {readOnly ? "Edit" : "Preview"}
                                </Button>
                                {!readOnly && (
                                    <Button
                                        type="primary"
                                        // onClick={() => saveUserDetails()}
                                        style={{ float: "right" }}
                                        size="small"
                                        htmlType="submit"
                                    >
                                        Update
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Col>
            <Col xs={2} md={8}></Col>
        </Row>
    );
};

export default User;
