import React from "react";

const Dice = (props) => {
  const style = {
    backgroundColor: props.isHeld ? "gray" : "white"
  };
  return (
    <div className="dice-face" onClick={props.holdDice} style={style}>
      <h2 className="dice-num">{props.value}</h2>
    </div>
  );
};
export default Dice;
