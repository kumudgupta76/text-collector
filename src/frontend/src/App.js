import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import User from "./components/user";
import requireAuth from "./util/requireAuth";
import RequireAuth from "./util/requireAuth";


// import "./components/alert/styles.scss";
import alertHoc from "./util/alert/alertHoc";
import loaderHoc from "./util/loader/loaderHoc";

const Error404 = () => {
  return (
    <div className="auth-wrapper">
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
      </Routes>
    </div>
  );
}

export default App;
