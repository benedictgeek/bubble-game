import React from "react";
import { GameBoard } from "./components/gameBoard";

const Game = () => {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <GameBoard />
      <p>Click Pad</p>
    </div>
  );
};

export default Game;
