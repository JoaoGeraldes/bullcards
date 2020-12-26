// REACT
import React from "react";
import ReactDOM from "react-dom";

// APP
import App from "./App";

// APP STYLE
import "./index.css";

// REDUX
import { Provider } from "react-redux";
import { store } from "./redux/store";

/*--*/
import reportWebVitals from "./reportWebVitals";

/* This simulates a click on the DOM - to avoid error of playing <audio> elements */
document.body.click();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
