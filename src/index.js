import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "milligram";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppState } from "./AppState";
import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <AppState>
    <Router>
      <React.StrictMode>
        <Route path="/" component={App} />
      </React.StrictMode>
    </Router>
  </AppState>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
