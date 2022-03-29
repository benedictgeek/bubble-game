import { useGameContext } from "../../state/contextProviders/gameContext";
import styles from "./scoreBoard.module.scss";
import { useStopwatch } from "react-timer-hook";
import { useCallback, useEffect } from "react";
export const ScoreBoard = ({}) => {
  let {
    state: { score, lives, shots },
  } = useGameContext();
  return (
    <div className={styles.container}>
      <ScoreSection value={shots} title="SHOTS" />
      <ScoreSection border={true} value={score} title="POINTS" />
      <ScoreSection value={lives} title="LIVES" />
    </div>
  );
};

export const ScoreSection = ({
  border = false,
  value = 0,
  title = "",
}: {
  value: any;
  title: string;
  border?: boolean;
}) => {
  return (
    <div
      className={`${styles.scoreSection} ${
        border && styles.scoreSection_border
      }`}
    >
      <div className={styles.section_value}>{value}</div>
      <div className={styles.section_title}>{title}</div>
    </div>
  );
};

export const GameTime = () => {
  const {
    state: { timerMode },
  } = useGameContext();
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  useEffect(() => {
    switch (timerMode) {
      case "PAUSED":
        pause();
        break;
      case "RESTART":
        reset();
        break;
      case "PLAY":
        start();
        break;
      default:
        break;
    }
  }, [timerMode]);

  const padTime = useCallback((value) => {
    return value.toString().padStart(2, "0");
  }, []);

  return (
    <div style={{ margin: "15px 0" }}>
      <ScoreSection
        value={`${padTime(hours)} : ${padTime(minutes)} : ${padTime(seconds)}`}
        title={"TIME"}
      />
    </div>
  );
};
