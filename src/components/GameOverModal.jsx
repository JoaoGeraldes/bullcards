import { Link } from "react-router-dom";
import { playSound } from "../helpers/audio";

const GameOverModal = () => {
  const custom = {
    background: "black",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
  };

  return (
    <div className="gameOverModal fade-in">
      <div style={custom}>
        <blockquote>Game Over</blockquote>
        <hr />
        <div>
          <Link
            onClick={() => playSound("#audio-switch")}
            onMouseOver={() => playSound("#audio-switch")}
            to="/score"
          >
            Go to Scoreboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
