import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";

const Menu = () => {
  const dispatch = useDispatch();
  const IS_AUDIO_MUTED = useSelector((state) => state.isAudioMuted);

  const toggleMenu = () => dispatch({ type: "TOGGLE_MENU" });

  /* Mute all the HTML audio elements */
  const toggleMute = (isAudioMuted) => {
    playSound();
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = !isAudioMuted;
    });
    dispatch({ type: "TOGGLE_AUDIO" });
  };

  const playSound = () => {
    const overSound = document.querySelector("#audio-switch");
    overSound.currentTime = 0;
    overSound.play();
  };

  // Inline styles
  const style = {
    off: {
      color: "red",
    },
    on: {
      color: "green",
    },
  };

  return (
    <div className="menu fade-in">
      <h1 onClick={toggleMenu} style={{ color: "grey", cursor: "pointer" }}>
        &#x021A4; close
      </h1>

      <h3>
        <Link onMouseOver={playSound} onClick={toggleMenu} to="/start">
          New game
        </Link>
      </h3>
      <h3>
        <Link onMouseOver={playSound} onClick={toggleMenu} to="/score">
          Scoreboard
        </Link>
      </h3>
      <h3>
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a
          style={{ cursor: "pointer" }}
          onClick={() => toggleMute(IS_AUDIO_MUTED)}
        >
          Sound:{" "}
          {IS_AUDIO_MUTED ? (
            <span style={style.off}>OFF</span>
          ) : (
            <span style={style.on}>ON</span>
          )}
        </a>
      </h3>
    </div>
  );
};

export default Menu;
