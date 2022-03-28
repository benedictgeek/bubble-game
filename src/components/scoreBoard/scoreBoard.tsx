import { useGameContext } from "../../state/contextProviders/gameContext";
import styles from "./scoreBoard.module.scss";
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
  return (
    <div style={{ margin: "15px 0" }}>
      <ScoreSection value={"2:06"} title={"TIME"} />
    </div>
  );
};
