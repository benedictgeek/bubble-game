import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import playerBallSlice from "./playerBallSlice";

export default configureStore({
  reducer: {
    playerBall: playerBallSlice,
    gameSlice: gameSlice
  },
});
