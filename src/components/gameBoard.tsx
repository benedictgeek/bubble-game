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
    gsap.to(ballRef.current, { x: width / 2 - 25, y: height - 52 });
  }, [width, height]);

  useEffect(() => {
    console.log("VALUEEE", trajectoryAngle);
    let radians = (trajectoryAngle * Math.PI) / 180;
    if (isShooting == true) {
      let distance =
        (width / 2 - 25) * Math.tan((trajectoryAngle * Math.PI) / 180);

      gsap.fromTo(
        ballRef.current,
        { x: width / 2 - 25, y: height - 52 },
        {
          x: Math.cos(radians) * height * Math.sin(radians),
          y: height * Math.sin(radians),
        }
      );
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
