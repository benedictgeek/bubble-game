import styles from "./scoreBoard.module.scss";
export const ScoreBoard = ({}) => {
  return (
    <div className={styles.container}>
      <ScoreSection value={80} title="BALLS" />
      <ScoreSection border={true} value={3456} title="POINTS" />
      <ScoreSection value={5} title="LIVES" />
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
