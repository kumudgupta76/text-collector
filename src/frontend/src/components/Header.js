import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/auth";
import { Menu, Layout, Avatar } from "antd";
import { EditOutlined, LoginOutlined, LogoutOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const AppHeader = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => _.pick(state, ['auth']));
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };
    const getUserName = (user) => {
        if (!_.get(user, "username")) {
            return "No UserName";
        }
        return user.username.length > 5 ? user.username : user.email + ` (${user.username})`;
    }
    return (
        <div className="header">
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="home" style={{ fontSize: "25px" }}><Link to={"/"}>Keep Noted</Link></Menu.Item>
                {_.get(state, 'auth.isLoggedIn') && (<Menu.Item key="notes" style={{ fontSize: "15px" }} icon={<SnippetsOutlined></SnippetsOutlined>}>
                    <Link to={"/notes"}>Notes</Link></Menu.Item>
                )}
                {_.get(state, 'auth.isLoggedIn') && (<Menu.Item key="new-note" style={{ fontSize: "15px" }} icon={<EditOutlined></EditOutlined>}>
                    <Link to={"/edit"}>New Note</Link></Menu.Item>
                )}
                <Menu.Item key="options" style={{ marginLeft: 'auto' }} >
                    {_.get(state, 'auth.isLoggedIn') ? (
                        <SubMenu
                            key="sub1-2"
                            title={getUserName(_.get(state, 'auth.user'))}
                            icon={
                                <Avatar
                                    size={30}
                                    style={{ backgroundColor: "#87d068", fontSize: "4px" }}
                                    icon={<UserOutlined />}
                                />
                            }
                            onTitleClick={() => navigate("/user")}
                        >
                            <Menu.Item key="5">
                                <Link to={"/user"}>{getUserName(_.get(state, 'auth.user'))}</Link>
                            </Menu.Item>
                            <Menu.Item key="6" onClick={handleLogout} icon={<LogoutOutlined></LogoutOutlined>}>
                                Logout
                            </Menu.Item>
                        </SubMenu>
                    ) : (
                        <SubMenu key="sub1-2" title="Login/SignUp" onTitleClick={() => navigate("/login")} icon={<LoginOutlined></LoginOutlined>}>
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
