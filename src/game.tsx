import React from "react";
import { GameBoard } from "./components/gameBoard";
import { GamePad } from "./components/pad/gamePad";

const Game = () => {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <GameBoard />
      <GamePad />
    </div>
  );
};

export default Game;
