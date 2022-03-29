import React, { useEffect, useRef } from "react";
import { usePlayerContext } from "../../state/contextProviders/playerContext";
import styles from "./pad.module.scss";
import gsap from "gsap";
import { getCenter } from "../../utils/gamePlay";
import { useGameContext } from "../../state/contextProviders/gameContext";

export const GamePad = () => {
  const padRef = useRef<any>(null);
  const indicatorRef = useRef<any>(null);

  let {
    state: { isShooting, trajectoryAngle },
    updateTrajectoryAngleDispatch,
    shootDispatch,
  } = usePlayerContext();

  let {
    state: {
      shots,
      modalData: { show },
    },
    setDynamicDispatch,
  } = useGameContext();

  useEffect(() => {
    if (show) return;
    let padIdentifier: any = padRef.current;

    padIdentifier?.addEventListener("mousemove", mouseMoveEventHandler);
    // indicatorRefIdentifier?.addEventListener("mousemove", () => null);

    // padIdentifier?.addEventListener("mousedown", mouseDownEventHandler);
    padIdentifier?.addEventListener("mousedown", mouseDownEventHandler);

    return () => {
      padIdentifier?.removeEventListener("mousemove", mouseMoveEventHandler);
      padIdentifier?.removeEventListener("mousedown", mouseDownEventHandler);
    };
  }, [isShooting, shots, show]);

  let mouseMoveEventHandler = (event: MouseEvent) => {
    let padIdentifier: any = padRef.current;
    let padHeight: number = padIdentifier?.getBoundingClientRect().height;
    let padWidth: number = padHeight;
    if (event.offsetY <= padHeight / 2) {
      let angle =
        Math.abs(
          Math.atan2(
            event.offsetY - padHeight / 2,
            padWidth / 2 - event.offsetX
          ) * 180
        ) / Math.PI;
      if (angle > 5 && angle < 175) {
        updateTrajectoryAngleDispatch(angle);
      }
    }
  };

  let mouseDownEventHandler = () => {
    setDynamicDispatch({ shots: shots + 1 });
    shootDispatch();
  };

  useEffect(() => {
    // console.log()
    if (isShooting) {
      let padIdentifier: any = padRef.current;
      padIdentifier?.removeEventListener("mousemove", mouseMoveEventHandler);
      padIdentifier?.removeEventListener("mousedown", mouseDownEventHandler);
    }
  }, [isShooting, shots]);

  useEffect(() => {
    let padRect = padRef.current?.getBoundingClientRect();
    let padX = padRect.x;
    let padY = padRect.y;
    let indecatorRect = indicatorRef.current?.getBoundingClientRect();
    padRect.width = padRect.width - indecatorRect.width / 2;
    let padCenter = getCenter(padRect);
    let radius = padRect.height / 2;
    let computedX =
      radius * Math.cos((trajectoryAngle * Math.PI) / 180) + padCenter.a;
    let computedY =
      radius * Math.sin((trajectoryAngle * Math.PI) / 180) + padCenter.b;
    gsap.set(indicatorRef.current, {
      left: padX - computedX,
      top: padY - indecatorRect.height / 2 - computedY,
    });
  }, [trajectoryAngle]);

  return (
    <div className={styles.container}>
      <div ref={padRef} className={styles.pad}>
        <div ref={indicatorRef} className={styles.indicator}></div>
        <div className={styles.padInner}></div>
      </div>
    </div>
  );
};
