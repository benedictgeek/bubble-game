import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useGameContext } from "../../state/contextProviders/gameContext";
import styles from "./ball.module.scss";

export const Ball = ({ color, id }: { color: string; id: string }) => {
  let { setCurrentBallRefDispatch, addBallRefDispatch } = useGameContext();

  const ballRef = useRef<HTMLDivElement | null>(null);

  // useImperativeHandle(
  //   ballRef.current,
  //   () => {
  //     return {
  //       current: {
  //         ...(ballRef.current ? ballRef.current : {}),
  //         mainColor: "testing ONE TWO",
  //       },
  //     };
  //   },
  //   []
  // );

  useEffect(() => {
    setCurrentBallRefDispatch(ballRef);
    addBallRefDispatch({ [id]: ballRef });

    // return () => {
    //   ballRef.current = null;
    // };
  }, []);

  return (
    <div
      // ref={ref}
      id={JSON.stringify({ color: color, id: id })}
      ref={ballRef}
      className={styles.ball}
      style={{
        width: 50,
        height: 50,
        backgroundColor: color,
      }}
    ></div>
  );
};
