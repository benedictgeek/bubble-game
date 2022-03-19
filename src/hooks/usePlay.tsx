import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { setNewBallTrigger } from "../state/gameSlice";
import { shoot } from "../state/playerBallSlice";

export const usePlay = () => {
  const { trajectoryAngle, isShooting } = useSelector(
    (state: any) => state.playerBall
  );

  const { currentBallRef, boardDimension, ballRefs } = useSelector(
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

        if (
          isCollide(currentBallRef) ||
          boardDimension.top >= currentBallRect.y
        ) {
          //temp
          handleSameBallsCheck(currentBallRef);
          //temp
          dispatch(shoot());
          dispatch(setNewBallTrigger());
          return;
        }

        window.requestAnimationFrame(moveBall);
      };

      window.requestAnimationFrame(moveBall);
    }
  }, [trajectoryAngle, boardDimension, currentBallRef, ballRefs, isShooting]);

  let getCenter = (currentBallRect: any) => {
    return {
      a: currentBallRect.x - currentBallRect.width / 2,
      b: currentBallRect.y - currentBallRect.width / 2,
    };
  };

  let getDistance = (currentBallCenter: any, center: any) => {
    return Math.sqrt(
      Math.pow(currentBallCenter.a - center.a, 2) +
        Math.pow(currentBallCenter.b - center.b, 2)
    );
  };

  let isCollide = (currentBallRef: any) => {
    let currentBallRect = currentBallRef.current.getBoundingClientRect();

    let currentBallCenter = getCenter(currentBallRect);

    for (let index = 0; index < ballRefs.length; index++) {
      const ballRef = ballRefs[index];

      let currentBallRect = ballRef.current.getBoundingClientRect();

      let center = getCenter(currentBallRect);

      //remove moving ball from check
      if (center.a == currentBallCenter.a && center.b == currentBallCenter.b)
        continue;

      let distance = getDistance(currentBallCenter, center);

      if (distance <= currentBallRect.width) return true;
    }

    return false;
  };

  let handleSameBallsCheck = (ballCollidingRef: any) => {
    let res = [];

    let currentBallColor = JSON.parse(ballCollidingRef.current.id).color;
    let currentBallRect = ballCollidingRef.current.getBoundingClientRect();

    let currentBallCenter = getCenter(currentBallRect);

    for (let index = 0; index < ballRefs.length; index++) {
      const ballRef = ballRefs[index];

      let currentBallRect = ballRef.current.getBoundingClientRect();

      let center = getCenter(currentBallRect);

      //remove moving ball from check
      if (center.a == currentBallCenter.a && center.b == currentBallCenter.b)
        continue;

      let distance = getDistance(currentBallCenter, center);
      let checkingBallColor = JSON.parse(ballRef.current.id).color;
      if (
        distance <= currentBallRect.width &&
        currentBallColor == checkingBallColor
      ) {
        res.push(ballRef);
      }
    }

    console.log("TOTAL SAME BALLS IN PATH", res);
  };
};
