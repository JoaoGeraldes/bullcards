import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playSound } from "../helpers/audio";

const Start = () => {
  const USERNAME = useSelector((state) => state.username);
  const usernameInput = useRef(null);
  const cardQuantityInput = useRef(8);
  const dispatch = useDispatch();

  const onMouseOverHandler = () => {
    playSound("#audio-mouseHover");
  };

  const onClickHandler = () => {
    playSound("#audio-click");
    // Set the username to the Redux Store
    dispatch({
      type: "SET_USERNAME",
      payload: [
        usernameInput.current.value,
        parseInt(cardQuantityInput.current.value),
      ],
    });
  };

  function SelectCardsQuantity() {
    return (
      <select ref={cardQuantityInput} name="quantity">
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>
    );
  }

  return (
    <>
      <div>Set your username</div>
      <input
        autoFocus
        ref={usernameInput}
        id="username"
        placeholder="username"
        defaultValue={USERNAME ? USERNAME : null}
      />
      <div>Set number of cards</div>
      <div>
        <SelectCardsQuantity />
      </div>
      <div>
        <hr />
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
