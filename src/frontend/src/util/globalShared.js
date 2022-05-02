import { useLocation } from "react-router-dom";
import * as React from "react";
import { Navigate } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { Breadcrumb, notification, Row,Spin } from "antd";
import _ from "lodash";

export default function GlobalShared({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const state = useSelector((state) => _.pick(state, ['user', 'shared']));
  console.log(user, state);

  const global = (state, children) => {
    //   if(_.get(state, "shared.loading")) {
    //       console.log("Loder loaded");
    //       return <Spin tip="Loading ... ...">
    //           {children}
    //       </Spin>
    //   }

      if(!_.isEmpty(state, "shared.message")) {
            // notification[_.get(state, "shared.message.message_type").lower()]({
            //     message:_.get(state, "shared.message.message_type"),
            //     description:_.get(state, "shared.message.message")
            // })
      }
      return children;
  }

  return global(state, children);
}