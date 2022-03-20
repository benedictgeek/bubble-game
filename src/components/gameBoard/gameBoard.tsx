import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardDimension, setCurrentBallRef } from "../../state/gameSlice";
import { random } from "../../utils/generate";
import { Ball } from "../ball/ball";
import styles from "./gameBoard.module.scss";

export const GameBoard = () => {
  const { newBallTrigger } = useSelector((state: any) => state.gameSlice);

  let getBallColor = () => ["red", "green", "blue", "purple"][random(0, 4)];
  const [balls, setBalls] = useState<JSX.Element[]>(() => [
    <Ball key={0} index={0} color={getBallColor()} />,
  ]);
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
        let color = getBallColor();
        return [
          ...balls,
          <Ball key={newBallTrigger} index={newBallTrigger} color={color} />,
        ];
      });
    }
  }, [newBallTrigger]);

  return (
    <div ref={boardRef} className={styles.boardContainer}>
      {balls}
    </div>
  );
};
