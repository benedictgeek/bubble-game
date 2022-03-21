import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import Game from "./game";
import { AppContextProvider } from "./state/contextProviders";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
        <Game />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
