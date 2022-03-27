import ballStyles from "../components/ball/ball.module.scss";
export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export let scoreFleetElement = ({ score = 0, top = 0, left = 0 }) => {
  let element = document.createElement("div");

  element.style.top = `${top}px`;
  element.style.left = `${left}px`;
  element.className = ballStyles.fleetScore;
  element.innerText = `+${score}`;
  return element;
};
