import { ObjectLiteral } from "../../../utils/interfaces";
import { StateTypes } from "./index";
import {
  SET_BALL_DIMENSION,
  SET_CURRENT_BALL_REF,
  SET_NEW_BALL_TRIGGER,
  ADD_BALL_REF,
  UPDATE_BALL_REFS,
  SET_BALL_REFS_IN_PATH,
  SET_SCORE,
  SET_BOARD_REF,
} from "./types";

export interface ActionTypes {
  type: string;
  payload: any | number | ObjectLiteral | ObjectLiteral[];
}

export const reducer = (state: StateTypes, action: ActionTypes) => {
  switch (action.type) {
    case SET_BALL_DIMENSION:
      return {
        ...state,
        boardDimension: action.payload,
      };
    case SET_CURRENT_BALL_REF:
      return {
        ...state,
        currentBallRef: action.payload,
      };
    case SET_NEW_BALL_TRIGGER:
      return {
        ...state,
        newBallTrigger: state.newBallTrigger + 1,
      };
    case ADD_BALL_REF:
      return {
        ...state,
        ballRefs: { ...state.ballRefs, ...action.payload },
      };
    case UPDATE_BALL_REFS:
      return {
        ...state,
        ballRefs: { ...action.payload },
      };
    case SET_BALL_REFS_IN_PATH:
      return {
        ...state,
        ballsRefsInPath: action.payload,
      };

    case SET_SCORE:
      return {
        ...state,
        score: action.payload,
      };

    case SET_BOARD_REF:
      return {
        ...state,
        boardRef: action.payload,
      };

    default:
      return state;
  }
};
