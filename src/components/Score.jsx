import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Score = () => {
  const dispatch = useDispatch();
  const SCOREBOARD = useSelector((state) => state.scoreboard);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  const SCOREBOARD_CLONE = [...SCOREBOARD];

  return (
    <div style={{ height: "90%" }}>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {SCOREBOARD_CLONE.reverse().map((score, index) => (
            <tr key={index}>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Score;
