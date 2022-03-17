import React from "react";
import { GameBoard } from "./components/gameBoard/gameBoard";
import { GamePad } from "./components/pad/gamePad";
import styles from "./index.module.scss";

const Game = () => {
  return (
    <div
      className={styles.appContainer}
    >
      <GameBoard />
      <GamePad />
    </div>
  );
};

export default Game;
