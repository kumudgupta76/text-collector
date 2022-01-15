import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          Keep Noted
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {state.isLoggedIn && (
                <button onClick={handleLogout}>Logout</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
