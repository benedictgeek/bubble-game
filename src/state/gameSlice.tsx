import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    boardDimension: {},
  },
  reducers: {
    setBoardDimension: (state, action) => {
      state.boardDimension = action.payload;
    },
  },
});

export const { setBoardDimension } = gameSlice.actions;

export default gameSlice.reducer;
