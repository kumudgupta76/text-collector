import { useLocation } from "react-router-dom";
import * as React from "react";
import { Navigate } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { Breadcrumb, Row } from "antd";
import _ from "lodash";

export default function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
//   const state = useSelector((state) => _.pick(state, ['user', 'shared']));
//   console.log(user, state);

  return user ? (
      <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container-inner" style={{ padding: 24, minHeight: 380 }}>
          {children}</div>
      </>
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}