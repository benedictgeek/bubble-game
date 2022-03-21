import React, { useReducer, useContext, FC, ComponentProps } from "react";
import { updateTrajectoryAngle, shoot, resetTrajectoryAngle } from "./actions";
import { reducer } from "./reducer";

export let usePlayerContext = () => useContext(PlayerContext);

export interface StateTypes {
  isShooting: boolean;
  trajectoryAngle: number;
}

let initialState: StateTypes = {
  trajectoryAngle: 90,
  isShooting: false,
};

interface ContextState {
  state: StateTypes;
  updateTrajectoryAngleDispatch: (payload: number) => void;
  shootDispatch: () => void;
  resetTrajectoryAngleDispatch: () => void;
}
const PlayerContext = React.createContext<ContextState>({
  state: initialState,
  updateTrajectoryAngleDispatch: () => {},
  shootDispatch: () => {},
  resetTrajectoryAngleDispatch: () => {},
});

export let PlayerContextProvider = ({ children }: ComponentProps<FC<{}>>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateTrajectoryAngleDispatch = (payload: number) => {
    updateTrajectoryAngle(payload, dispatch);
  };

  const shootDispatch = () => {
    shoot(null, dispatch);
  };

  const resetTrajectoryAngleDispatch = () => {
    resetTrajectoryAngle(null, dispatch);
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        updateTrajectoryAngleDispatch,
        shootDispatch,
        resetTrajectoryAngleDispatch,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
