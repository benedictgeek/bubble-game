import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardDimension, setCurrentBallRef } from "../../state/gameSlice";
import { Ball } from "../ball/ball";
import styles from "./gameBoard.module.scss";

export const GameBoard = () => {
  const [ballRefs, setBallRefs] = useState<React.MutableRefObject<any>[]>([]);
  // const {} = useSelector((state: any) => state.gameSlice);
  let addBallRefs = useCallback((ref) => {
    setBallRefs((prevRefs) => {
      let updatedRefs = [...prevRefs];
      updatedRefs.push(ref);

      dispatch(setCurrentBallRef(ref));

      return updatedRefs;
    });
  }, []);
  const [balls, setBalls] = useState<JSX.Element[]>(() => [
    <Ball key={0} ref={addBallRefs} />,
  ]);
  let boardRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBoardDimension(boardRef.current?.getBoundingClientRect().toJSON())
    );
  }, []);

  return (
    <div ref={boardRef} className={styles.boardContainer}>
      {balls}
    </div>
  );
};
