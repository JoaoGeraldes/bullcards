import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Score = () => {
  const dispatch = useDispatch();
  const SCORE = useSelector((state) => state.score);
  const SCOREBOARD = useSelector((state) => state.scoreboard);
  const TIMER = useSelector((state) => state.timer);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, []);

  /*   for(let i = SCOREBOARD.length-1; i > 0; i--){

  } */

  const SCOREBOARD_CLONE = [...SCOREBOARD];

  return (
    <div>
      {console.log(SCOREBOARD)}
      {SCOREBOARD_CLONE.reverse().map((score, index) => (
        <h2 key={index}>{score}</h2>
      ))}
    </div>
  );
};

export default Score;
