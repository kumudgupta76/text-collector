import { useLocation } from "react-router-dom";
import * as React from "react";
import { Navigate } from "react-router-dom";
import {connect} from "react-redux";

export default function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  console.log(user);

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }

// export default connect(mapStateToProps)(RequireAuth);
