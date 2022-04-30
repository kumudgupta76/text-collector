import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signup } from "../../store/actions/auth";

const SignUp = () => {
  const dispatch = useDispatch();
  const localState = useSelector((state) => state);

  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { value , name} = e.target;
    setData(data => ({ ...data, [name]: value }));
  };
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = () => {
    if (data.username && data.password && data.confirm_password == data.password && data.email) {
      dispatch(signup(data )).then((res) => {
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
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              className="form-control"
              placeholder="Re enter password"
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Submit
          </button>
            <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
            </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
