import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Start = () => {
  const USERNAME = useSelector((state) => state.username);
  const usernameInput = useRef(null);
  const dispatch = useDispatch();

  const onMouseOverHandler = () => {
    const hoverSound = document.querySelector("#audio-mouseHover");
    hoverSound.currentTime = 0;
    hoverSound.play();
  };

  const onClickHandler = () => {
    const hoverSound = document.querySelector("#audio-click");
    hoverSound.currentTime = 0;
    hoverSound.play();

    // Set the username to the Redux Store
    dispatch({ type: "SET_USERNAME", payload: usernameInput.current.value });
  };

  return (
    <>
      <h3>Set your username</h3>
      <input
        ref={usernameInput}
        id="username"
        placeholder="username"
        defaultValue={USERNAME ? USERNAME : null}
      />
      <div>
        <Link to="/play">
          <button
            type="submit"
            onMouseOver={onMouseOverHandler}
            onClick={onClickHandler}
          >
            Start
          </button>
        </Link>
      </div>
    </>
  );
};

export default Start;
