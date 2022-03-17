import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import Game from "./game";
import { Provider } from "react-redux";
import store from "./state/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
