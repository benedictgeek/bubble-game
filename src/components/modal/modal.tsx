import { useEffect, useRef } from "react";
import Modal from "react-modal";
import styles from "./modal.module.scss";
import bubblesPng from "../../asset/images/bubbles.png";
import { useGameContext } from "../../state/contextProviders/gameContext";
import { ballRefsArray } from "../../utils/gamePlay";
import { usePlayerContext } from "../../state/contextProviders/playerContext";
export const GameModal = ({}) => {
  const {
    state: {
      shots,
      score,
      lives,
      ballRefs,
      modalData: { show, title, subTitle, option },
    },
    setDynamicDispatch,
  } = useGameContext();
  let handleButtonClick = (type: string) => {
    switch (type) {
      case "continue":
        if (lives == 0) return;
        setDynamicDispatch({
          timerMode: "PLAY",
          lives: lives - 1,
          modalData: { show: false },
          ballsRefsInPath: ballRefsArray(ballRefs),
          ballRefs: {},
        });
        break;
      case "play":
        setDynamicDispatch({ timerMode: "PLAY", modalData: { show: false } });
        break;
      case "restart":
        setDynamicDispatch({
          timerMode: "RESTART",
          shots: 0,
          score: 0,
          lives: 5,
          modalData: { show: false },
          ballsRefsInPath: ballRefsArray(ballRefs),
          ballRefs: {},
        });
        break;
      default:
        break;
    }
  };
  return (
    <Modal
      ariaHideApp={false}
      isOpen={show ?? false}
      style={{
        content: {
          //   fontFamily: "cursive",
          width: "100%",
          //   maxWidth: "450px",
          position: "unset",
          //  border: "none"
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
        overlay: {
          //   maxWidth: "50%",
          maxWidth: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <div>
        <span className={styles.title}>BUBBLES</span>
        {/* <img className={styles.modalBubble} src={bubblesPng} /> */}
      </div>

      <div className={styles.content}>{title}</div>
      <div className={styles.subContent}>{subTitle}</div>
      <div className={styles.btnGroup}>
        <Button
          type="continue"
          title="Continue"
          disabled={option === "PLAY" || lives == 0}
          onClick={handleButtonClick}
        />
        <div style={{ width: "15px" }}></div>
        <Button
          type="play"
          title="Play"
          disabled={option !== "PLAY"}
          onClick={handleButtonClick}
        />
        <div style={{ width: "15px" }}></div>
        <Button
          type="restart"
          title="Restart"
          disabled={option === "PLAY"}
          onClick={handleButtonClick}
        />
      </div>
    </Modal>
  );
};

export const Button = ({
  type = "",
  title = "",
  disabled = false,
  onClick = (type: string) => {},
}) => {
  let handleClick = () => {
    if (disabled) return;
    onClick(type);
  };
  return (
    <div
      className={`${styles.button} ${disabled && styles.disabled} `}
      onClick={() => handleClick()}
    >
      {title}
    </div>
  );
};
