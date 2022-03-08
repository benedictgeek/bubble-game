import { createSlice } from "@reduxjs/toolkit";

export const ballSlice = createSlice({
  name: "playerBall",
  initialState: {
    trajectoryAngle: 90,
    isShooting: false,
  },
  reducers: {
    updateTrajectoryAngle: (state, action) => {
      state.trajectoryAngle = action.payload;
    },

    shoot: (state) => {
      state.isShooting = true;
    },

    resetTrajectoryAngle: (state) => {
      state.trajectoryAngle = 90;
      state.isShooting = false;
    },
  },
});

export const { updateTrajectoryAngle, resetTrajectoryAngle, shoot } =
  ballSlice.actions;

export default ballSlice.reducer;
