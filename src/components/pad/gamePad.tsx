import React, { useEffect, useRef } from "react";
import styles from "./pad.module.scss";

export const GamePad = () => {
  const padHeight = 100;
  const padWidth = 100;
  const padRef = useRef(null);
  useEffect(() => {
    document.getElementById("pad")?.addEventListener("mousemove", (event) => {
      console.log(
        Math.abs(Math.atan2(event.offsetY - 50, 50 - event.offsetX) * 180) /
          Math.PI
      );
    });
  }, []);
  return (
    <div className={styles.container}>
      <div
        id="pad"
        ref={padRef}
        className={styles.pad}
        style={{ width: padWidth, height: padHeight }}
      ></div>
    </div>
  );
};
