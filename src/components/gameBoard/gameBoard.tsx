import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardDimension, setCurrentBallRef } from "../../state/gameSlice";
import { Ball } from "../ball/ball";
import styles from "./gameBoard.module.scss";

export const GameBoard = () => {
  // const [ballRefs, setBallRefs] = useState<React.MutableRefObject<any>[]>([]);
  const { newBallTrigger } = useSelector((state: any) => state.gameSlice);
  // let addBallRefs = useCallback((ref) => {
  //   setBallRefs((prevRefs) => {
  //     let updatedRefs = [...prevRefs];
  //     updatedRefs.push(ref);

  //     return updatedRefs;
  //   });
  // }, []);
  const [balls, setBalls] = useState<JSX.Element[]>(() => [<Ball key={0} />]);
  let boardRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBoardDimension(boardRef.current?.getBoundingClientRect().toJSON())
    );
  }, []);

  useEffect(() => {
    if (newBallTrigger > 0) {
      setBalls((balls: any) => {
        return [...balls, <Ball key={newBallTrigger} />];
      });
    }
  }, [newBallTrigger]);

  return (
    <div ref={boardRef} className={styles.boardContainer}>
      {balls}
    </div>
  );
};
