import React, { useEffect, useLayoutEffect, useState } from "react";

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
      style={{ width: width, height: height, border: "2px solid black" }}
    ></div>
  );
};
