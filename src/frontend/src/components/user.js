import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { startLoading } from "../store/actions/shared";
import { getUserDetails } from "../store/actions/users";
import Header from "./header";

const User = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(getUserDetails(15)).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="auth-wrapper">
      <div
        className="container-inner"
        style={{
          wordBreak: "break-word",
        }}
      >
          <Header></Header>
        {JSON.stringify(state)}
      </div>
    </div>
  );
};

export default User;
