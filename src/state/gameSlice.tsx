import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    boardDimension: {},
    currentBallRef: null,
  },
  reducers: {
    setBoardDimension: (state, action) => {
      state.boardDimension = action.payload;
    },
    setCurrentBallRef: (state, action) => {
      state.currentBallRef = action.payload;
    },
  },
});

export const { setBoardDimension, setCurrentBallRef } = gameSlice.actions;

export default gameSlice.reducer;
