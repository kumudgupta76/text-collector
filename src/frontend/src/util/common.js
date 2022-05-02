import { notification } from "antd";
import React from "react";

import {useState} from 'react'

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}


export function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

export function message(message) {
    notification[message.type]({
        message:message.title,
        description:message.description
    });
}