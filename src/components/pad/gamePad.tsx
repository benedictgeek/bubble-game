import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTrajectoryAngle,
  resetTrajectoryAngle,
  shoot,
} from "../../state/playerBallSlice";
import styles from "./pad.module.scss";

export const GamePad = () => {
  const padHeight = 100;
  const padWidth = 100;
  const padRef = useRef(null);

  const playerBallValue = useSelector((state: any) => state.playerBall);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("VALUEEE", playerBallValue.trajectoryAngle);
    console.log(
      "Y",
      Math.sin((playerBallValue.trajectoryAngle * Math.PI) / 180)
    );
    console.log(
      "X",
      - Math.cos((playerBallValue.trajectoryAngle * Math.PI) / 180)
    );
  }, [playerBallValue]);

  useEffect(() => {
    let padIdentifier: any = padRef.current;
    let mouseMoveEventHandler = (event: MouseEvent) => {
      if (event.offsetY <= padHeight / 2) {
        let angle =
          Math.abs(
            Math.atan2(
              event.offsetY - padHeight / 2,
              padWidth / 2 - event.offsetX
            ) * 180
          ) / Math.PI;
        dispatch(updateTrajectoryAngle(angle));
      }
    };
    padIdentifier?.addEventListener("mousemove", mouseMoveEventHandler);
    let mouseDownEventHandler = () => dispatch(shoot());
    padIdentifier?.addEventListener("mousedown", mouseDownEventHandler);

    return () => {
      padIdentifier?.removeEventListener("mousemove", mouseMoveEventHandler);
      padIdentifier?.removeEventListener("mousedown", mouseDownEventHandler);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div
        ref={padRef}
        className={styles.pad}
        style={{ width: padWidth, height: padHeight }}
      ></div>
    </div>
  );
};
