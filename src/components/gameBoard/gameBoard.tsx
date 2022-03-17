import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardDimension } from "../../state/gameSlice";
import { Ball } from "../ball/ball";
import styles from "./gameBoard.module.scss";

export const GameBoard = () => {
  const [ballRefs, setBallRefs] = useState<React.MutableRefObject<any>[]>([]);
  let boardRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBoardDimension(boardRef.current?.getBoundingClientRect()));
  }, []);

  let addBallRefs = useCallback((ref) => {
    setBallRefs((prevRefs) => {
      let updatedRefs = [...prevRefs];
      updatedRefs.push(ref);

      return updatedRefs;
    });
  }, []);

  return (
    <div ref={boardRef} className={styles.boardContainer}>
      <Ball ref={addBallRefs} />
    </div>
  );
};
