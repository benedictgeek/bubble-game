import { createSlice } from "@reduxjs/toolkit";

export const ballSlice = createSlice({
  name: "playerBall",
  initialState: {
    trajectoryAngle: 90,
  },
  reducers: {
    updateTrajectoryAngle: (state, action) => {
      state.trajectoryAngle = action.payload;
    },

    resetTrajectoryAngle: (state) => {
      state.trajectoryAngle = 90;
    },
  },
});

export const { updateTrajectoryAngle, resetTrajectoryAngle } =
  ballSlice.actions;

export default ballSlice.reducer;
