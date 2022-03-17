import { forwardRef, useRef } from "react";
import { useSelector } from "react-redux";

export const Ball = forwardRef(({}, ref) => {
  const { trajectoryAngle, isShooting } = useSelector(
    (state: any) => state.playerBall
  );
  const ballRef = useRef(null);
  // useEffect(() => {
  //   gsap.to(ballRef.current, { x: width / 2 - 25, y: height - 50 });
  // }, [width, height]);

  // useEffect(() => {
  //   let radians = 0;
  //   let xWidth = width / 2 - 25;
  //   let xHeight = 0;
  //   let from = { x: width / 2 - 25, y: height - 52 };
  //   let to = { x: 0, y: 0 };
  //   let isLeftSide = true;
  //   let isHeightReached = false;
  //   if (isShooting == true) {
  //     if (trajectoryAngle < 90) {
  //       radians = trajectoryAngle * (Math.PI / 180);
  //       //width is know here

  //       //we use tan here to get height (opp / adj)
  //       let widthPoint = 0;
  //       xHeight = height - 50 - Math.tan(radians) * xWidth;
  //       isHeightReached = Math.max(0, xHeight) == 0;
  //       if (isHeightReached) {
  //         xHeight = 0;
  //         widthPoint = xWidth - (height - 50) / Math.tan(radians);
  //       }
  //       to.x = widthPoint;
  //       to.y = xHeight;
  //       isLeftSide = true;
  //     } else if (trajectoryAngle == 90) {
  //       to.x = xWidth;
  //       to.y = 0;
  //       isHeightReached = true;
  //     } else if (trajectoryAngle > 90) {
  //       radians = (180 - trajectoryAngle) * (Math.PI / 180);
  //       let widthPoint = width - 50;
  //       xHeight = height - 50 - Math.tan(radians) * xWidth;
  //       isHeightReached = Math.max(0, xHeight) == 0;
  //       if (isHeightReached) {
  //         xHeight = 0;
  //         widthPoint = xWidth + (height - 50) / Math.tan(radians);
  //       }
  //       to.x = widthPoint;
  //       to.y = xHeight;
  //       isLeftSide = false;
  //     }

  //     console.log("TO:  ", to);

  //     let points = [{ from, to }];
  //     let newFrom = { ...to };
  //     let newTo = { x: 0, y: 0 };
  //     while (!isHeightReached) {
  //       let newX = isLeftSide ? 0 : width - 50;
  //       newTo.x = newX;
  //       let angle = isLeftSide ? trajectoryAngle + 90 : trajectoryAngle;
  //       radians = angle * (Math.PI / 180);

  //       console.log("DIFF SIDE", Math.tan(radians) * width, angle);

  //       let diff = height - newFrom.y - Math.tan(radians) * width;

  //       console.log("DIFF", diff);

  //       isHeightReached = Math.max(0, diff) == 0;
  //       newTo.y = diff;
  //       if (isHeightReached) {
  //         newTo.y = 0;
  //         // widthPoint = xWidth - (height - 50) / Math.tan(radians);
  //       }
  //       isLeftSide = !isLeftSide;

  //       points.push({ from: newFrom, to: newTo });
  //     }

  //     points.forEach(({ from, to }) => {
  //       gsap.fromTo(ballRef.current, from, to);
  //     });
  //   }
  // }, [isShooting]);

  return (
    <div
      ref={ballRef}
      style={{
        width: 50,
        height: 50,
        borderRadius: " 50%",
        backgroundColor: "red",
      }}
    ></div>
  );
});
