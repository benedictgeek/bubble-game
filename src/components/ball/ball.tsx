import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBallRef, setCurrentBallRef } from "../../state/gameSlice";
import styles from "./ball.module.scss";

export const Ball = ({ color, index }: { color: string; index: number }) => {
  const dispatch = useDispatch();

  const ballRef = useRef(null);

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
    dispatch(setCurrentBallRef(ballRef));
    dispatch(addBallRef(ballRef));
  }, []);

  return (
    <>
      <div
        // ref={ref}
        id={JSON.stringify({ color: color, index: index })}
        ref={ballRef}
        className={styles.ball}
        style={{
          width: 50,
          height: 50,
          backgroundColor: color,
        }}
      ></div>
    </>
  );
};
