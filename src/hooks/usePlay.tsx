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
    state: { currentBallRef, boardDimension, ballRefs, score },
    setNewBallTriggerDispatch,
    updateBallRefsDispatch,
    setBallRefsInPathDispatch,
  } = useGameContext();

  useEffect(() => {
    if (isShooting) {
      let yOffset = -Math.sin((trajectoryAngle * Math.PI) / 180);
      let xOffset = -Math.cos((trajectoryAngle * Math.PI) / 180);

      let moveBall = (timestamp: number) => {
        if (currentBallRef.current == null) return;
        gsap.to(currentBallRef.current, {
          x: "+=" + xOffset * 4,
          y: "+=" + yOffset * 4,
          duration: 0,
        });

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
          let res = handleSameBallsCheck(currentBallRef);
          if (res.length < 3) {
            shootDispatch();
            setNewBallTriggerDispatch();
          }
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

  let ballRefsArray = (ballRefs: {}) => {
    return Object.entries(ballRefs).map(([_, value]) => value) as any[];
  };

  let handleSameBallsCheck = (ballCollidingRef: any) => {
    let res = [ballCollidingRef] as any[];
    let _ballRefs = Object.entries(ballRefs).map(
      ([_, value]) => value
    ) as any[];
    let ballRefsCpy = [..._ballRefs];

    let getSurroundingMatchingBalls = (ballCollidingRef: any) => {
      let collectedRefIndex = ballRefsCpy.indexOf(ballCollidingRef);

      ballRefsCpy.splice(collectedRefIndex, 1);

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
      for (let index = 0; index < surroundingBalls.length; index++) {
        const ball = surroundingBalls[index];
        getSurroundingMatchingBalls(ball);
      }
    };

    getSurroundingMatchingBalls(ballCollidingRef);
    if (res.length >= 3) {
      let refsCpy = { ...ballRefs };
      for (let index = 0; index < res.length; index++) {
        const ref = res[index];
        let id = JSON.parse(ref.current.id).id;

        delete refsCpy[id];
      }
      shootDispatch();
      updateBallRefsDispatch(refsCpy);
      setBallRefsInPathDispatch(res);
    }

    return res;
  };

  useEffect(() => {
    //get all refs that are hanging freelly except the currentRef
    if (isShooting == false && score > 0) {
      if (currentBallRef.current != null) {
        let currentBallRect = currentBallRef.current.getBoundingClientRect();
        console.log(currentBallRect, boardDimension);
        if (currentBallRect.bottom == boardDimension.bottom - 2) {
          return;
        }
      }

      let res = [];
      let ballRefsCpy = { ...ballRefs };
      // delete ballRefsCpy[JSON.parse(currentBallRef?.current.id).id];

      let ballRefsArr = ballRefsArray(ballRefsCpy);

      for (let index = 0; index < ballRefsArr.length; index++) {
        let numberOfSiblings = 0;
        const outterRef = ballRefsArr[index];
        let currentBallRect = outterRef.current.getBoundingClientRect();
        let center = getCenter(currentBallRect);
        for (let index = 0; index < ballRefsArr.length; index++) {
          const innerRef = ballRefsArr[index];
          if (innerRef == outterRef) continue;
          let currentBallRect = innerRef.current.getBoundingClientRect();
          let currentBallCenter = getCenter(currentBallRect);
          let distance = getDistance(currentBallCenter, center);
          if (numberOfSiblings > 0) break;
          if (distance <= currentBallRect.width) {
            numberOfSiblings++;
          }
        }
        if (numberOfSiblings == 0) {
          res.push(outterRef);
        }
      }

      console.log(res);
    }
  }, [isShooting, boardDimension, currentBallRef, ballRefs, score]);
};
