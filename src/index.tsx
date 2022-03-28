import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import Game from "./game";
import { AppContextProvider } from "./state/contextProviders";
import Modal from "react-modal";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Game />
      {/* <Modal isOpen={true} style/> */}
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
