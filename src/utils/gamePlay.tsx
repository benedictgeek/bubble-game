import gsap from "gsap";
import { scoreFleetElement } from "./generate";

export let getCenter = (currentBallRect: any) => {
  return {
    a: currentBallRect.x - currentBallRect.width / 2,
    b: currentBallRect.y - currentBallRect.height / 2,
  };
};

export let getDistance = (currentBallCenter: any, center: any) => {
  return Math.sqrt(
    Math.pow(currentBallCenter.a - center.a, 2) +
      Math.pow(currentBallCenter.b - center.b, 2)
  );
};

export let ballRefsArray = (ballRefs: {}) => {
  return Object.entries(ballRefs).map(([_, value]) => value) as any[];
};

export let getSurroundingMatchingBalls = (
  ballCollidingRef: any,
  ballRefsCpy: any[],
  resultArr: any[],
  checkColor = true,
  ballBorderWidth: number
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
        distance <= currentBallRect.width + ballBorderWidth &&
        currentBallColor == checkingBallColor
      ) {
        surroundingBalls.push(ballRef);
        resultArr.push(ballRef);
      }
    } else if (distance <= currentBallRect.width + ballBorderWidth) {
      surroundingBalls.push(ballRef);
      resultArr.push(ballRef);
    }
  }
  for (let index = 0; index < surroundingBalls.length; index++) {
    const ball = surroundingBalls[index];
    getSurroundingMatchingBalls(
      ball,
      ballRefsCpy,
      resultArr,
      checkColor,
      ballBorderWidth
    );
  }

  return surroundingBalls;
};

export let removeRefsFromRefsObject = (refsObject: any, refsList: any) => {
  for (let index = 0; index < refsList.length; index++) {
    const ref = refsList[index];
    let id = JSON.parse(ref.current.id).id;

    delete refsObject[id];
  }

  return refsObject;
};

export let handleHangingBalls = (
  ballRefsArr: any[],
  boardDimension: any,
  ballBorderWidth: number
) => {
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
    getSurroundingMatchingBalls(
      topBallRef,
      ballRefsArr,
      res,
      false,
      ballBorderWidth
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

export const handleFleetScore = ({
  firstBallRef,
  score = 0,
  boardRef,
}: {
  firstBallRef: any;
  score: number;
  boardRef: any;
}) => {
  let boardDimension = boardRef.current.getBoundingClientRect();
  let firstBallDimensions = firstBallRef.current.getBoundingClientRect();
  let fleetElement = scoreFleetElement({
    score: score,
    top: firstBallDimensions.top - boardDimension.top,
    left: firstBallDimensions.left - boardDimension.left,
  });
  boardRef.current.appendChild(fleetElement);

  gsap.to(fleetElement, {
    opacity: 0,
    duration: 2,
    onComplete: () => {
      boardRef.current.removeChild(fleetElement);
    },
  });
};
