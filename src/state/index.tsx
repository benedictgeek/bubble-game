import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import playerBallSlice from "./playerBallSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["game/setCurrentBallRef", "game/addBallRef"],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["gameSlice.currentBallRef.current", "gameSlice.ballRefs"],
      },
    }),
  reducer: {
    playerBall: playerBallSlice,
    gameSlice: gameSlice,
  },
});
