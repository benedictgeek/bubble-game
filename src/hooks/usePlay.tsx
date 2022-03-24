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
    setScoreDispatch,
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
  }, [
    trajectoryAngle,
    boardDimension,
    currentBallRef,
    ballRefs,
    isShooting,
    score,
  ]);

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

  let ballRefsArray = (ballRefs: {}) => {
    return Object.entries(ballRefs).map(([_, value]) => value) as any[];
  };

  let isCollide = (currentBallRef: any) => {
    let currentBallRect = currentBallRef.current.getBoundingClientRect();

    let currentBallCenter = getCenter(currentBallRect);

    let _ballRefs = ballRefsArray(ballRefs);

    for (let index = 0; index < _ballRefs.length; index++) {
      const ballRef = _ballRefs[index];

      if (!ballRef.current) continue;

      let currentBallRect = ballRef.current.getBoundingClientRect();

      let center = getCenter(currentBallRect);

      //remove moving ball from check
      if (center.a == currentBallCenter.a && center.b == currentBallCenter.b)
        continue;
      //removes hanging/falling balls to be compared with
      let checkingBallColorZindex = ballRef?.current?.style.zIndex == 5;
      if (checkingBallColorZindex) continue;

      let distance = getDistance(currentBallCenter, center);

      if (distance <= currentBallRect.width) return true;
    }

    return false;
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

  let removeRefsFromRefsObject = (refsObject: any, refsList: any) => {
    for (let index = 0; index < refsList.length; index++) {
      const ref = refsList[index];
      let id = JSON.parse(ref.current.id).id;

      delete refsObject[id];
    }

    return refsObject;
  };

  let handleSameBallsCheck = (ballCollidingRef: any) => {
    let res = [ballCollidingRef] as any[];

    let ballRefsCpy = ballRefsArray({ ...ballRefs });

    getSurroundingMatchingBalls(ballCollidingRef, ballRefsCpy, res, true);
    if (res.length >= 3) {
      let refsCpy = { ...ballRefs };

      let t1 = gsap.timeline({
        paused: true,
        repeat: 4,
        // autoRemoveChildren: true,
        onComplete: () => {
          //if completed animating matching balls
          //check for hanging balls
          for (let index = 0; index < res.length; index++) {
            const ref = res[index];
            gsap.to(ref.current, { opacity: 0 });
          }

          let hangingBalls = handleHangingBalls(ballRefsCpy);

          if (hangingBalls.length > 0) {
            // t1.to
            let t2 = gsap.timeline({
              paused: true,
              // repeat: -1,
              // repeatRefresh: true,
              // autoRemoveChildren
              onComplete: () => {
                refsCpy = removeRefsFromRefsObject(refsCpy, [
                  ...res,
                  ...hangingBalls,
                ]);
                shootDispatch();
                updateBallRefsDispatch(refsCpy);
                setBallRefsInPathDispatch([...res, ...hangingBalls]);
                setScoreDispatch(score + 3);
                console.log("DONE SHAKING OFF HANGING!!");
              },
            });

            for (let index = 0; index < hangingBalls.length; index++) {
              const ref = hangingBalls[index];
              t2.to(
                ref.current,
                {
                  y: 50 * 3,
                  x: 50 * (index % 2 == 0 ? -3 : 3),
                  opacity: 0,
                  zIndex: 5,
                },
                0
              );
            }

            t2.totalDuration(2).play();
          } else {
            refsCpy = removeRefsFromRefsObject(refsCpy, res);
            shootDispatch();
            updateBallRefsDispatch(refsCpy);
            setBallRefsInPathDispatch(res);
            setScoreDispatch(score + 3);
          }
        },
      });

      for (let index = 0; index < res.length; index++) {
        const ref = res[index];
        t1.fromTo(ref.current, { opacity: 1 }, { opacity: 0.5 }, 0);
      }
      t1.duration(0.3).play();
    }

    return res;
  };

  let handleHangingBalls = (ballRefsArr: any[]) => {
    let res = [] as any[];
    let topBalls = [];
    for (let index = 0; index < ballRefsArr.length; index++) {
      const element = ballRefsArr[index];
      if (!element.current) continue;
      let currentBallRect = element?.current?.getBoundingClientRect();
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

    return hangingBalls;
  };
};
