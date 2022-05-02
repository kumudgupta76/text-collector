import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import User from "./components/User";
import requireAuth from "./util/requireAuth";
import RequireAuth from "./util/requireAuth";
import MyEditor from "./components/note/MyEditor"
import TestEditor from "./components/note/TestEditor"


// import "./components/alert/styles.scss";
import alertHoc from "./util/alert/alertHoc";
import loaderHoc from "./util/loader/loaderHoc";
import Note from "./components/note/Note";
import Notes from "./components/note/Notes";
import Header from "./components/Header";
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import GlobalShared from "./util/globalShared";


const Error404 = () => {
  return (
    <div className="container-wrapper">
      <div>
        <h1>404 page not exists</h1>
      </div>
    </div>
  );
};

// in ms
const ALERT_TIMEOUTS = {
  error: 4000,
  success: 3000,
  info: 3000
};

const SampleApp = ({ alertMessage }) => (
  <React.Fragment>
    {["error", "success", "info"].map(messageType => (
      <div key={messageType}>
        <button
          onClick={() =>
            alertMessage[messageType](`It's ${messageType}`, {
              timeout: ALERT_TIMEOUTS[messageType]
            })
          }
        >
          {`Show ${messageType}`}
        </button>
      </div>
    ))}
  </React.Fragment>
);

const AppWithAlert = alertHoc(SampleApp);


function App() {
  return (
    <GlobalShared>
      <Header className="header"></Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/user"
          element={(
            <RequireAuth>
              <User></User>
            </RequireAuth>
          )}
        />
        <Route path="/test" element={<AppWithAlert/> }/>
        <Route path="/edit" element={<RequireAuth><MyEditor></MyEditor></RequireAuth>}/>
        <Route path="/notes/:id" element={<RequireAuth><Note/></RequireAuth>}/>
        <Route path="/notes" element={<RequireAuth><Notes></Notes></RequireAuth>}/>
        <Route path="/testeditor" element={<TestEditor/>}/>
      </Routes>
    </Content>
      <div className="footer">Copyright reserved @2022</div>
  </GlobalShared>
  );
}

export default App;
