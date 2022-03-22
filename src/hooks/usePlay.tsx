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

  let getSurroundingMatchingBalls = (
    ballCollidingRef: any,
    ballRefsCpy: any[],
    resultArr: any[],
    checkColor = true
  ) => {
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

      if (checkColor) {
        if (
          distance <= currentBallRect.width &&
          currentBallColor == checkingBallColor
        ) {
          surroundingBalls.push(ballRef);
          resultArr.push(ballRef);
        }
      } else if (distance <= currentBallRect.width) {
        surroundingBalls.push(ballRef);
        resultArr.push(ballRef);
      }
    }
    for (let index = 0; index < surroundingBalls.length; index++) {
      const ball = surroundingBalls[index];
      getSurroundingMatchingBalls(ball, ballRefsCpy, resultArr, checkColor);
    }

    return surroundingBalls;
  };

  let handleSameBallsCheck = (ballCollidingRef: any) => {
    let res = [ballCollidingRef] as any[];

    let ballRefsCpy = ballRefsArray({ ...ballRefs });

    getSurroundingMatchingBalls(ballCollidingRef, ballRefsCpy, res, true);
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
        return;
      }

      //get all balls hugging the top
      let res = [] as any[];
      let topBalls = [];
      let ballRefsCpy = { ...ballRefs };

      let ballRefsArr = ballRefsArray(ballRefsCpy);
      for (let index = 0; index < ballRefsArr.length; index++) {
        const element = ballRefsArr[index];
        let currentBallRect = element.current.getBoundingClientRect();
        if (currentBallRect.top <= boardDimension.top) {
          topBalls.push(element);
        }
      }

      for (let index = 0; index < topBalls.length; index++) {
        const topBallRef = topBalls[index];
        res.push(topBallRef);
        console.log(
          getSurroundingMatchingBalls(topBallRef, ballRefsArr, res, false)
        );
      }

      let hangingBalls = ballRefsArr
        .filter((ref) => !res.includes(ref))
        .sort(
          (a, b) =>
            a.current.getBoundingClientRect().top -
            b.current.getBoundingClientRect().top
        );

      // let t1 = gsap.timeline({
      //   repeat: 4,

      //   onComplete: () => {},
      // });
      // t1.pause();
      let yOffset = -Math.sin((90 * Math.PI) / 180);
      let moveSinlgeHangingBall = (ref: any, delay: number) => {
        let moveHang = () => {
          gsap.to(ref.current, { y: "+=" + yOffset * 6, delay });

          requestAnimationFrame(moveHang);
        };

        requestAnimationFrame(moveHang);
      };

      for (let index = 0; index < hangingBalls.length; index++) {
        const ref = hangingBalls[index];
        moveSinlgeHangingBall(ref, 0.1 * index);
      }

      return;
    }
  }, [isShooting, boardDimension, currentBallRef, ballRefs, score]);
};
