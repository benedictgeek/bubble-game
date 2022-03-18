import { useEffect } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export const usePlay = () => {
  const { trajectoryAngle, isShooting } = useSelector(
    (state: any) => state.playerBall
  );

  const { currentBallRef } = useSelector((state: any) => state.gameSlice);

  useEffect(() => {
    if (isShooting) {
      let yOffset = -Math.sin((trajectoryAngle * Math.PI) / 180);
      let xOffset = -Math.cos((trajectoryAngle * Math.PI) / 180);

      let moveBall = (timestamp: number) => {
        gsap.to(currentBallRef.current, {
          x: "+=" + xOffset,
          y: "+=" + yOffset,
          duration: 0,
        });
        // currentBallRef.current.offsetLeft =
        //   currentBallRef.current.getBoundingClientRect().x + xOffset;
        // currentBallRef.current.offsetTop =
        //   currentBallRef.current.getBoundingClientRect().y + yOffset;

        // let { offsetTop, offsetLeft, offsetHeight } = currentBallRef.current;
        console.log(
          "OFFSET X",
          currentBallRef.current.getBoundingClientRect().x
        );

        window.requestAnimationFrame(moveBall);
      };

      window.requestAnimationFrame(moveBall);
    }
  }, [trajectoryAngle, isShooting, currentBallRef]);
};
