import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../store/actions/auth";
import { get } from "lodash";

const Login = () => {
  const dispatch = useDispatch();
  const localState = useSelector((state) => state);

  

  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value , name} = e.target;
    setData(data => ({ ...data, [name]: value }));
  };
  const navigate = useNavigate();
  const { state } = useLocation();

  React.useEffect(() => {
    if(get(localState, 'auth.isLoggedIn')) {
      navigate('/notes');
    }
  },[]);
  const handleLogin = () => {
    if (data.username && data.password) {
      dispatch(login(data.username, data.password)).then((res) => {
        console.log("response of login ",res);
        navigate(
          state != null && state.path != null ? state.path : "/user"
        );
      });
    }
  };

  return (
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
  );
};

export default Login;
