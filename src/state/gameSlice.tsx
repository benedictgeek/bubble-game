import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    boardDimension: { top: 0, height: 0, width: 0 },
    currentBallRef: null,
    newBallTrigger: 0,
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
  },
});

export const { setBoardDimension, setCurrentBallRef, setNewBallTrigger } =
  gameSlice.actions;

export default gameSlice.reducer;
