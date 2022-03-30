import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import Game from "./game";
import { AppContextProvider } from "./state/contextProviders";
import { GameModal } from "./components/modal/modal";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Game />
      <GameModal />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();
