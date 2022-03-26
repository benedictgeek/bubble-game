import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useGameContext } from "../../state/contextProviders/gameContext";
import styles from "./ball.module.scss";

export const Ball = ({ color, id }: { color: string; id: string }) => {
  let {
    state: { ballBorderWidth },
    setCurrentBallRefDispatch,
    addBallRefDispatch,
  } = useGameContext();

  const ballRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentBallRefDispatch(ballRef);
    addBallRefDispatch({ [id]: ballRef });
  }, []);

  return (
    <div
      // ref={ref}
      id={JSON.stringify({ color: color, id: id })}
      ref={ballRef}
      className={styles.ball}
      style={{
        border: `${ballBorderWidth}px solid ${color}`,
      }}
    ></div>
  );
};
