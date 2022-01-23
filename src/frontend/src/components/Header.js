import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/auth";
import { Menu, Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const AppHeader = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="header">
            <Menu theme="dark" mode="horizontal">
                <Link to={"/"}><Menu.Item key="title " style={{fontSize:"25px"}}>Keep Noted</Menu.Item></Link>
                <Menu.Item key="options" style={{ marginLeft: 'auto' }} >
                    {state.isLoggedIn ? (
                        <SubMenu
                            key="sub1-2"
                            title="UserName"
                            icon={
                                <Avatar
                                    size={30}
                                    style={{ backgroundColor: "#87d068", fontSize: "4px" }}
                                    icon={<UserOutlined />}
                                />
                            }
                        >
                            <Menu.Item key="5">
                                <Link to={"/user"}>User Details</Link>
                            </Menu.Item>
                            <Menu.Item key="6" onClick={handleLogout}>
                                Logout
                            </Menu.Item>
                        </SubMenu>
                    ) : (
                        <SubMenu key="sub1-2" title="Login/SignUp">
                            <Menu.Item key="5">
                                <Link to={"/login"}>Login</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to={"/signup"}>SignUp</Link>
                            </Menu.Item>
                        </SubMenu>
                    )}
                </Menu.Item>
            </Menu>
        </div>
    );

};

export default AppHeader;
