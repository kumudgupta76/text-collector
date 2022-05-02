import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../store/actions/auth";
import _ from "lodash";
import { Spin, Row, Col } from "antd";
import { startLoading, stopLoading } from "../../store/actions/shared";

const Login = () => {
    const dispatch = useDispatch();
    const localState = useSelector((state) => _.pick(state, ['user', 'shared']));


    const [data, setData] = React.useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData(data => ({ ...data, [name]: value }));
    };
    const navigate = useNavigate();
    const { state } = useLocation();

    React.useEffect(() => {
        if (_.get(localState, 'auth.isLoggedIn')) {
            navigate('/notes');
        }
    }, []);
    const handleLogin = () => {
        if (data.username && data.password) {
            dispatch(startLoading())
            dispatch(login(data.username, data.password)).then((res) => {
                console.log("response of login ", res);
                dispatch(stopLoading())
                navigate(
                    state != null && state.path != null ? state.path : "/user"
                );
            });

        }
    };

    return _.get(localState, 'shared.loading') ? <Spin tip="Loading..."></Spin> : (
        <Row>
            <Col xs={2} md={8}></Col>
            <Col xs={20} md={8}>
                <div className="container-wrapper">
                    <div className="container-inner">
                        <form>
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter email or username"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={handleLogin}
                            >
                                Submit
                            </button>
                            <p className="forgot-password text-right">
                                New User <a href="/signup">Create Account</a>
                            </p>
                        </form>
                    </div>
                </div>
            </Col>
            <Col xs={2} md={8}></Col>
        </Row>
    );
};

export default Login;
