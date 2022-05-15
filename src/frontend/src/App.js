import React from "react";
import { Helmet } from "react-helmet";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

// import Login from "./components-old/auth/login";
import SignUp from "./components-old/auth/signup";
import User from "./components-old/User";
import requireAuth from "./util/requireAuth";
import RequireAuth from "./util/requireAuth";
import MyEditor from "./components-old/note/MyEditor";
import TestEditor from "./components-old/note/TestEditor";

// import "./components/alert/styles.scss";
import alertHoc from "./util/alert/alertHoc";
import loaderHoc from "./util/loader/loaderHoc";
import Note from "./components-old/note/Note";
import Notes from "./components-old/note/Notes";
import Header from "./components-old/Header";
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import GlobalShared from "./util/globalShared";
import { light } from "./theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import Loading from "./components/util/Loading";
import Notification from "./components/util/Notification";
import Page404 from "./components/Page404";
import Page500 from "./components/Page500";

function App() {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={light}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/404" element={<Page404 />} />
          <Route exact path="/register" element={<Page500 />} />
          <Route path="*" element={<Page404 />} />
          <Route
            exact
            path="/user"
            element={
              <RequireAuth>
                <User></User>
              </RequireAuth>
            }
          />
          <Route
            path="/edit"
            element={
              <RequireAuth>
                <MyEditor></MyEditor>
              </RequireAuth>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <RequireAuth>
                <Note />
              </RequireAuth>
            }
          />
          <Route
            path="/notes"
            element={
              <RequireAuth>
                <Notes></Notes>
              </RequireAuth>
            }
          />
        </Routes>
      </ThemeProvider>
      <Loading></Loading>
      <Notification></Notification>
    </>
  );
}

export default App;
