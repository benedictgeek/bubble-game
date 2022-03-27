import React from "react";
import { ObjectLiteral } from "../../../utils/interfaces";
import { ActionTypes } from "./reducer";
import {
  SET_BALL_DIMENSION,
  SET_CURRENT_BALL_REF,
  SET_NEW_BALL_TRIGGER,
  ADD_BALL_REF,
  UPDATE_BALL_REFS,
  SET_BALL_REFS_IN_PATH,
  SET_SCORE,
  SET_BOARD_REF
} from "./types";

export let setBoardDimension = (
  payload: any,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: SET_BALL_DIMENSION, payload: payload });
};

export let setCurrentBallRef = (
  payload: any,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: SET_CURRENT_BALL_REF, payload: payload });
};

export let setNewBallTrigger = (
  _: any,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: SET_NEW_BALL_TRIGGER, payload: null });
};

export let addBallRef = (
  payload: ObjectLiteral,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: ADD_BALL_REF, payload: payload });
};

export let updateBallRefs = (
  payload: ObjectLiteral,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: UPDATE_BALL_REFS, payload: payload });
};

export let setBallRefsInPath = (
  payload: ObjectLiteral[],
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: SET_BALL_REFS_IN_PATH, payload: payload });
};

export let setScore = (
  payload: number,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: SET_SCORE, payload: payload });
};

export let setBoardRef = (
  payload: ObjectLiteral,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: SET_BOARD_REF, payload: payload });
};
