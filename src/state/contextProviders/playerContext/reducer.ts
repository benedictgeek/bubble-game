import {
  UPDATE_TRAGECTORY_ANGLE,
  SET_SHOOT,
  RESET_TRAGECTORY_ANGLE,
} from "./types";

import { StateTypes } from "./index";

export interface ActionTypes {
  type: string;
  payload: any | number ;
}

export const reducer = (state: StateTypes, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_TRAGECTORY_ANGLE:
      return {
        ...state,
        trajectoryAngle: action.payload,
      };
    case SET_SHOOT:
      return {
        ...state,
        isShooting: !state.isShooting,
      };
    case RESET_TRAGECTORY_ANGLE:
      return {
        ...state,
        trajectoryAngle: 90,
        isShooting: false,
      };

    default:
      return state;
  }
};
