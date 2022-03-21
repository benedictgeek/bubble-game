import { useEffect } from "react";
import gsap from "gsap";
import { usePlayerContext } from "../state/contextProviders/playerContext";
import { useGameContext } from "../state/contextProviders/gameContext";

export const usePlay = () => {
  let {
    state: { trajectoryAngle, isShooting },
    shootDispatch,
  } = usePlayerContext();

  let {
    state: { currentBallRef, boardDimension, ballRefs },
    setNewBallTriggerDispatch,
    updateBallRefsDispatch,
    setBallRefsInPathDispatch,
  } = useGameContext();



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
          handleSameBallsCheck(currentBallRef);
          shootDispatch();
          setNewBallTriggerDispatch();
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

    let _ballRefs = Object.entries(ballRefs).map(
      ([_, value]) => value
    ) as any[];

    for (let index = 0; index < _ballRefs.length; index++) {
      const ballRef = _ballRefs[index];

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
    let res = [ballCollidingRef] as any[];
    let _ballRefs = Object.entries(ballRefs).map(
      ([_, value]) => value
    ) as any[];
    let ballRefsCpy = [..._ballRefs];

    console.log("TOTAL STUFF", ballRefsCpy);

    let getSurroundingMatchingBalls = (ballCollidingRef: any) => {
      //remove already collected refs from ballRefsCpy

      // for (let index = 0; index < res.length; index++) {
      //   const collectedRef = res[index];

      // let collectedRefIndex = JSON.parse(ballCollidingRef.current.id).id;

      let collectedRefIndex = ballRefsCpy.indexOf(ballCollidingRef);

      ballRefsCpy.splice(collectedRefIndex, 1);
      // }

      let surroundingBalls = [];
      let currentBallColor = JSON.parse(ballCollidingRef.current.id).color;
      let currentBallRect = ballCollidingRef.current.getBoundingClientRect();

      let currentBallCenter = getCenter(currentBallRect);

      for (let index = 0; index < ballRefsCpy.length; index++) {
        const ballRef = ballRefsCpy[index];

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
          surroundingBalls.push(ballRef);
          res.push(ballRef);
        }
      }
      console.log("TOTAL SAME BALLS IN PATH--->", surroundingBalls);
      for (let index = 0; index < surroundingBalls.length; index++) {
        const ball = surroundingBalls[index];
        getSurroundingMatchingBalls(ball);
      }
    };

    getSurroundingMatchingBalls(ballCollidingRef);
    if (res.length >= 3) {
      // updateBallRefsDispatch({});
      setBallRefsInPathDispatch(res);
    }

    console.log("TOTAL SAME BALLS IN PATH", res);

    return res;
  };
};
