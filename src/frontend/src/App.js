import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import User from "./components/user";
import requireAuth from "./util/requireAuth";
import RequireAuth from "./util/requireAuth";
import MyEditor from "./components/note/MyEditor"
import TestEditor from "./components/note/TestEditor"


// import "./components/alert/styles.scss";
import alertHoc from "./util/alert/alertHoc";
import loaderHoc from "./util/loader/loaderHoc";
import Note from "./components/note/Note";
import Notes from "./components/note/Notes";

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
    <div className="App">
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
        <Route path="/edit" element={<MyEditor></MyEditor>}/>
        <Route path="/notes/:id" element={<Note></Note>}/>
        <Route path="/notes" element={<Notes></Notes>}/>
        <Route path="/testeditor" element={<TestEditor/>}/>
      </Routes>
    </div>
  );
}

export default App;
