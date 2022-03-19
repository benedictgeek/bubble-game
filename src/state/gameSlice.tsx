import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    boardDimension: { top: 0, height: 0, width: 0 },
    currentBallRef: null,
    newBallTrigger: 0,
    ballRefs: [] as any[],
  },
  reducers: {
    setBoardDimension: (state, action) => {
      state.boardDimension = action.payload;
    },
    setCurrentBallRef: (state, action) => {
      state.currentBallRef = action.payload;
    },
    setNewBallTrigger: (state) => {
      state.newBallTrigger = state.newBallTrigger + 1;
    },
    addBallRef: (state, action) => {
      state.ballRefs = [...state.ballRefs, action.payload];
    },
  },
});

export const { setBoardDimension, setCurrentBallRef, setNewBallTrigger, addBallRef } =
  gameSlice.actions;

export default gameSlice.reducer;
