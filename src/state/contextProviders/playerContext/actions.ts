import {
  UPDATE_TRAGECTORY_ANGLE,
  SET_SHOOT,
  RESET_TRAGECTORY_ANGLE,
} from "./types";

import { ActionTypes } from "./reducer";

export let updateTrajectoryAngle = (
  payload: number,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: UPDATE_TRAGECTORY_ANGLE, payload: payload });
};

export let shoot = (_: any, dispatch: React.Dispatch<ActionTypes>) => {
  dispatch({ type: SET_SHOOT, payload: null });
};

export let resetTrajectoryAngle = (
  _: any,
  dispatch: React.Dispatch<ActionTypes>
) => {
  dispatch({ type: RESET_TRAGECTORY_ANGLE, payload: null });
};
