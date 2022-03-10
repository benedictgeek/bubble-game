import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const GameBoard = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    if (windowWidth <= 350) {
      windowWidth = windowWidth * 0.9;
    } else if (windowWidth <= 620) {
      windowWidth = windowWidth * 0.8;
    } else {
      windowWidth = windowWidth * 0.3;
    }
    setHeight(windowHeight * 0.7);
    setWidth(windowWidth);
  }, []);

  return (
    <div
      style={{
        width: width,
        height: height,
        border: "2px solid black",
      }}
    >
      <Ball width={width} height={height} />
    </div>
  );
};

const Ball = ({ width, height }: { width: number; height: number }) => {
  const { trajectoryAngle, isShooting } = useSelector(
    (state: any) => state.playerBall
  );
  const ballRef = useRef(null);
  useEffect(() => {
    gsap.to(ballRef.current, { x: width / 2 - 25, y: height - 50 });
  }, [width, height]);

  useEffect(() => {
    let radians = trajectoryAngle * (Math.PI / 180);
    let xWidth = width / 2 - 25;
    let xHeight = 0;
    let from = { x: width / 2 - 25, y: height - 52 };
    let to = { x: 0, y: 0 };
    if (isShooting == true) {
      if (trajectoryAngle < 90) {
        //width is know here

        //we use tan here to get height (opp / adj)
        let widthPoint = 0;
        xHeight = height - 50 - Math.tan(radians) * xWidth;
        let isHeightReached = Math.max(0, xHeight) == 0;
        console.log("HEIGHT COMP", xHeight, isHeightReached);
        if (isHeightReached) {
          xHeight = 0;
          widthPoint = xWidth - (height - 50) / Math.tan(radians);
        }
        to.x = widthPoint;
        to.y = xHeight;
      } else if (trajectoryAngle == 90) {
        to.x = xWidth;
        to.y = 0;
      } else if (trajectoryAngle > 90) {
        return;
      }

      console.log("TO:  ", to);

      gsap.fromTo(ballRef.current, from, to);
    }
  }, [isShooting]);

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
};
