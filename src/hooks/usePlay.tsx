import { useEffect } from "react";
import gsap from "gsap";
import { usePlayerContext } from "../state/contextProviders/playerContext";
import { useGameContext } from "../state/contextProviders/gameContext";
import {
  getCenter,
  getDistance,
  ballRefsArray,
  getSurroundingMatchingBalls,
  removeRefsFromRefsObject,
  handleHangingBalls,
  handleFleetScore,
} from "../utils/gamePlay";
import { scoreFleetElement } from "../utils/generate";

export const usePlay = () => {
  let {
    state: { trajectoryAngle, isShooting },
    shootDispatch,
    resetTrajectoryAngleDispatch,
  } = usePlayerContext();

  let {
    state: {
      currentBallRef,
      boardDimension,
      boardRef,
      ballRefs,
      score,
      ballBorderWidth,
    },
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
          boardDimension.top >= currentBallRect.y ||
          isCollide(currentBallRef)
        ) {
          let res = handleSameBallsCheck(currentBallRef);
          if (res.length < 3) {
            shootDispatch();
            setNewBallTriggerDispatch();
            resetTrajectoryAngleDispatch();
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

      if (distance < currentBallRect.width + ballBorderWidth) return true;
    }

    return false;
  };

  let handleSameBallsCheck = (ballCollidingRef: any) => {
    let res = [ballCollidingRef] as any[];

    let ballRefsCpy = ballRefsArray({ ...ballRefs });

    getSurroundingMatchingBalls(
      ballCollidingRef,
      ballRefsCpy,
      res,
      true,
      ballBorderWidth
    );
    if (res.length >= 3) {
      let refsCpy = { ...ballRefs };

      let t1 = gsap.timeline({
        paused: true,
        repeat: 4,
        // autoRemoveChildren: true,
        onComplete: () => {
          //if completed animating matching balls
          //check for hanging balls
          let firstBallRef;
          for (let index = 0; index < res.length; index++) {
            const ref = res[index];
            if (index == 0) {
              firstBallRef = ref;
            }
            gsap.to(ref.current, { opacity: 0 });
          }
          let matchingScore = res.length * 2;
          handleFleetScore({
            firstBallRef: firstBallRef,
            score: matchingScore,
            boardRef: boardRef,
          });

          let hangingBalls = handleHangingBalls(
            ballRefsCpy,
            boardDimension,
            ballBorderWidth
          );

          if (hangingBalls.length > 0) {
            handleFleetScore({
              firstBallRef: hangingBalls[0],
              score: hangingBalls.length,
              boardRef: boardRef,
            });
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
                setScoreDispatch(score + matchingScore + hangingBalls.length);
                resetTrajectoryAngleDispatch();
                console.log("DONE SHAKING OFF HANGING!!");
              },
            });

            for (let index = 0; index < hangingBalls.length; index++) {
              const ref = hangingBalls[index];
              let currentBallRect = ref.current.getBoundingClientRect();
              let playerBallWidth = currentBallRect.width;
              t2.to(
                ref.current,
                {
                  y: playerBallWidth * 3,
                  x: playerBallWidth * (index % 2 == 0 ? -3 : 3),
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
            setScoreDispatch(score + matchingScore);
            resetTrajectoryAngleDispatch();
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

  useEffect(() => {
    console.log(currentBallRef, Object.keys(ballRefs).length);
    if (currentBallRef == null) return;
    let _ballRefs = ballRefsArray(ballRefs);
    let playerBallRect = currentBallRef.current.getBoundingClientRect();
    let playerBallCenter = getCenter(playerBallRect);
    for (let index = 0; index < _ballRefs.length; index++) {
      const ref = _ballRefs[index];
      if (!ref?.current) continue;
      if (ref == currentBallRef) continue;
      let currentBallRect = ref.current.getBoundingClientRect();
      let center = getCenter(currentBallRect);
      let distance = getDistance(playerBallCenter, center);
      if (distance <= playerBallRect.width) {
        console.log("GAME OVER!!!");
      }
    }
  }, [currentBallRef]);
};
