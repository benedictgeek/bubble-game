import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBallRef, setCurrentBallRef } from "../../state/gameSlice";
import { random } from "../../utils/generate";
import styles from "./ball.module.scss";

export const Ball = ({}) => {
  const dispatch = useDispatch();

  const ballRef = useRef(null);

  // useImperativeHandle(
  //   ref,
  //   () => {
  //     return {
  //       current: ballRef.current,
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
        ref={ballRef}
        className={styles.ball}
        style={{
          width: 50,
          height: 50,
          backgroundColor: ["red", "green", "blue"][random(0, 3)],
        }}
      ></div>
    </>
  );
};
