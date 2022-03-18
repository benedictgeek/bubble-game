import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { setNewBallTrigger } from "../state/gameSlice";
import { shoot } from "../state/playerBallSlice";

export const usePlay = () => {
  const { trajectoryAngle, isShooting } = useSelector(
    (state: any) => state.playerBall
  );

  const { currentBallRef, boardDimension } = useSelector(
    (state: any) => state.gameSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShooting) {
      let yOffset = -Math.sin((trajectoryAngle * Math.PI) / 180);
      let xOffset = -Math.cos((trajectoryAngle * Math.PI) / 180);

      let moveBall = (timestamp: number) => {
        gsap.to(currentBallRef.current, {
          x: "+=" + xOffset * 4,
          y: "+=" + yOffset * 4,
          duration: 0,
        });
        // currentBallRef.current.offsetLeft =
        //   currentBallRef.current.getBoundingClientRect().x + xOffset;
        // currentBallRef.current.offsetTop =
        //   currentBallRef.current.getBoundingClientRect().y + yOffset;

        // let { offsetTop, offsetLeft, offsetHeight } = currentBallRef.current;
        let currentBallRect = currentBallRef.current.getBoundingClientRect();
        if (
          boardDimension.left >= currentBallRect.x ||
          boardDimension.right - currentBallRect.width <= currentBallRect.x
        ) {
          xOffset = -xOffset;
        }

        if (boardDimension.top >= currentBallRect.y) {
          dispatch(shoot());
          dispatch(setNewBallTrigger());
          return;
        }

        window.requestAnimationFrame(moveBall);
      };

      window.requestAnimationFrame(moveBall);
    }
  }, [trajectoryAngle, boardDimension, currentBallRef, isShooting]);
};
