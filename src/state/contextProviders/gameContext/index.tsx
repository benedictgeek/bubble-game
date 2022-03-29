import React, { useReducer, useContext, FC, ComponentProps } from "react";
import { ObjectLiteral } from "../../../utils/interfaces";
import {
  setBoardDimension,
  setCurrentBallRef,
  setNewBallTrigger,
  addBallRef,
  updateBallRefs,
  setBallRefsInPath,
  setScore,
  setBoardRef,
  setDynamic,
} from "./actions";
import { reducer } from "./reducer";

export let useGameContext = () => useContext(GameContext);

export interface StateTypes {
  boardDimension: any;
  currentBallRef: any;
  newBallTrigger: number;
  ballRefs: ObjectLiteral;
  ballsRefsInPath: ObjectLiteral[];
  score: number;
  shots: number;
  lives: number;
  ballBorderWidth: number;
  boardRef: ObjectLiteral;
  modalData: {
    show?: boolean;
    title?: string;
    subTitle?: string;
    option?: string;
  };
  timerMode: string;
}

let initialState: StateTypes = {
  boardDimension: { top: 0, height: 0, width: 0 },
  currentBallRef: null,
  newBallTrigger: 0,
  ballRefs: {},
  ballsRefsInPath: [],
  score: 0,
  shots: 0,
  lives: 5,
  ballBorderWidth: 2,
  boardRef: {},
  modalData: {
    show: true,
    title: "WELCOME",
    subTitle: "Press play to start knocking bubbles off!",
    option: "PLAY",
  },
  timerMode: "PAUSED",
};

interface ContextState {
  state: StateTypes;
  setBoardDimensionDispatch: (payload: any) => void;
  setCurrentBallRefDispatch: (payload: any) => void;
  setNewBallTriggerDispatch: () => void;
  setBoardRefDispatch: (payload: ObjectLiteral) => void;
  addBallRefDispatch: (payload: ObjectLiteral) => void;
  updateBallRefsDispatch: (payload: ObjectLiteral) => void;
  setBallRefsInPathDispatch: (payload: ObjectLiteral[]) => void;
  setScoreDispatch: (payload: number) => void;
  setDynamicDispatch: (payload: ObjectLiteral) => void;
}
const GameContext = React.createContext<ContextState>({
  state: initialState,
  setBoardDimensionDispatch: () => {},
  setCurrentBallRefDispatch: () => {},
  setNewBallTriggerDispatch: () => {},
  addBallRefDispatch: () => {},
  setBoardRefDispatch: () => {},
  updateBallRefsDispatch: () => {},
  setBallRefsInPathDispatch: () => {},
  setScoreDispatch: () => {},
  setDynamicDispatch: () => {},
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

  const setScoreDispatch = (payload: number) => {
    setScore(payload, dispatch);
  };

  const setBoardRefDispatch = (payload: ObjectLiteral) => {
    setBoardRef(payload, dispatch);
  };

  const setDynamicDispatch = (payload: ObjectLiteral) => {
    setDynamic(payload, dispatch);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        setDynamicDispatch,
        setBoardRefDispatch,
        setBoardDimensionDispatch,
        setCurrentBallRefDispatch,
        setNewBallTriggerDispatch,
        addBallRefDispatch,
        updateBallRefsDispatch,
        setBallRefsInPathDispatch,
        setScoreDispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
