import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import './global.css'
import App from "./App";
import "./i18n";
import reportWebVitals from "./reportWebVitals";

const Start = () => {
  return (
    <div className="App">
        <App />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Start />);

// ReactDOM.createRoot(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
