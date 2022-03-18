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

  const { isShooting } = useSelector((state: any) => state.playerBall);
  const dispatch = useDispatch();

  useEffect(() => {
    let padIdentifier: any = padRef.current;

    padIdentifier?.addEventListener("mousemove", mouseMoveEventHandler);

    padIdentifier?.addEventListener("mousedown", mouseDownEventHandler);

    return () => {
      padIdentifier?.removeEventListener("mousemove", mouseMoveEventHandler);
      padIdentifier?.removeEventListener("mousedown", mouseDownEventHandler);
    };
  }, [isShooting]);

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

  let mouseDownEventHandler = () => dispatch(shoot());

  useEffect(() => {
    if (isShooting) {
      let padIdentifier: any = padRef.current;
      padIdentifier?.removeEventListener("mousemove", mouseMoveEventHandler);
      padIdentifier?.removeEventListener("mousedown", mouseDownEventHandler);
    }
  }, [isShooting]);

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
