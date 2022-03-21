import React, { useReducer, useContext, FC, ComponentProps } from "react";
import { ObjectLiteral } from "../../../utils/interfaces";
import {
  setBoardDimension,
  setCurrentBallRef,
  setNewBallTrigger,
  addBallRef,
  updateBallRefs,
  setBallRefsInPath,
} from "./actions";
import { reducer } from "./reducer";

export let useGameContext = () => useContext(GameContext);

export interface StateTypes {
  boardDimension: any;
  currentBallRef: any;
  newBallTrigger: number;
  ballRefs: ObjectLiteral;
  ballsRefsInPath: ObjectLiteral[];
}

let initialState: StateTypes = {
  boardDimension: { top: 0, height: 0, width: 0 },
  currentBallRef: null,
  newBallTrigger: 0,
  ballRefs: {},
  ballsRefsInPath: [],
};

interface ContextState {
  state: StateTypes;
  setBoardDimensionDispatch: (payload: any) => void;
  setCurrentBallRefDispatch: (payload: any) => void;
  setNewBallTriggerDispatch: () => void;
  addBallRefDispatch: (payload: ObjectLiteral) => void;
  updateBallRefsDispatch: (payload: ObjectLiteral) => void;
  setBallRefsInPathDispatch: (payload: ObjectLiteral[]) => void;
}
const GameContext = React.createContext<ContextState>({
  state: initialState,
  setBoardDimensionDispatch: () => {},
  setCurrentBallRefDispatch: () => {},
  setNewBallTriggerDispatch: () => {},
  addBallRefDispatch: () => {},
  updateBallRefsDispatch: () => {},
  setBallRefsInPathDispatch: () => {},
});

export let GameContextProvider = ({ children }: ComponentProps<FC<{}>>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setBoardDimensionDispatch = (payload: any) => {
    setBoardDimension(payload, dispatch);
  };

  const setCurrentBallRefDispatch = (payload: any) => {
    setCurrentBallRef(payload, dispatch);
  };

  const setNewBallTriggerDispatch = () => {
    setNewBallTrigger(null, dispatch);
  };

  const addBallRefDispatch = (payload: ObjectLiteral) => {
    addBallRef(payload, dispatch);
  };
  const updateBallRefsDispatch = (payload: ObjectLiteral) => {
    updateBallRefs(payload, dispatch);
  };

  const setBallRefsInPathDispatch = (payload: ObjectLiteral[]) => {
    setBallRefsInPath(payload, dispatch);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        setBoardDimensionDispatch,
        setCurrentBallRefDispatch,
        setNewBallTriggerDispatch,
        addBallRefDispatch,
        updateBallRefsDispatch,
        setBallRefsInPathDispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
