import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from './store/store'
import {Provider} from 'react-redux';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
            <App />
            </Provider>
        </React.StrictMode>,
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();