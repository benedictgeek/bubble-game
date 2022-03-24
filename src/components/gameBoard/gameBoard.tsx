import React, { useEffect, useMemo, useRef, useState } from "react";

import { random } from "../../utils/generate";
import { Ball } from "../ball/ball";
import styles from "./gameBoard.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useGameContext } from "../../state/contextProviders/gameContext";

export const GameBoard = () => {
  let {
    state: { newBallTrigger, ballsRefsInPath, ballRefs },
    setBoardDimensionDispatch,
    setBallRefsInPathDispatch,
    setNewBallTriggerDispatch,
  } = useGameContext();

  let getBallColor = () => ["red", "blue", "purple", "green"][random(0, 4)];
  const [balls, setBalls] = useState<{}>(() => {
    let id = uuidv4();
    return {
      [id]: <Ball key={id} id={id} color={getBallColor()} />,
    };
  });
  let boardRef = useRef<any>(null);

  useEffect(() => {
    setBoardDimensionDispatch(
      boardRef.current?.getBoundingClientRect().toJSON()
    );
  }, []);

  useEffect(() => {
    if (newBallTrigger > 0) {
      setBalls((balls: any) => {
        let id = uuidv4();
        return {
          ...balls,
          [id]: <Ball key={id} id={id} color={getBallColor()} />,
        };
      });
    }
  }, [newBallTrigger]);

  useEffect(() => {
    if (ballsRefsInPath.length > 0) {
      let ballsCpy = { ...balls } as any;
      setBallRefsInPathDispatch([]);
      for (let index = 0; index < ballsRefsInPath.length; index++) {
        const ref = ballsRefsInPath[index];

        let id = JSON.parse(ref.current.id).id;

        delete ballsCpy[id];
      }

      setBalls({ ...ballsCpy });
      setNewBallTriggerDispatch();
    }
  }, [ballRefs, ballsRefsInPath]);

  let ballsArray = useMemo(() => {
    return Object.entries(balls).map(([_, value]) => value);
  }, [balls]);

  return (
    <div ref={boardRef} className={styles.boardContainer}>
      {ballsArray}
    </div>
  );
};
