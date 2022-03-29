import React from "react";
import { GameBoard } from "./components/gameBoard/gameBoard";
import { GamePad } from "./components/pad/gamePad";
import {
  GameTime,
  ScoreBoard,
  ScoreSection,
} from "./components/scoreBoard/scoreBoard";
import { usePlay } from "./hooks/usePlay";
import styles from "./index.module.scss";

const Game = () => {
  usePlay();
  return (
    <div className={styles.appContainer}>
      <ScoreBoard />
      <GameBoard />
      <GamePad />
      <GameTime />
      
    </div>
  );
};

export default Game;
