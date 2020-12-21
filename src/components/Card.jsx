import * as Deck from "../assets/deck/index";
import NonFlippedCard from "../assets/deck/back/back.svg";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const Card = ({ match, id, card, isFlipped, onClick: flipCard }) => {
  /*   const flipCard = useMemo(
    () => onClick(),
    [isFlipped]
  ); */
  const hasMatch = match !== null;
  const flipEffect = isFlipped ? "flip-vertical-right" : "flip-vertical-left";
  const isActionBlocked = flipCard === null;

  const clickHandler = () => {
    if (isActionBlocked) {
      return;
    }
    const flipCardSound = document.querySelector("#audio-cardflip");
    flipCardSound.currentTime = 0;
    flipCardSound.play();
    flipCard({
      type: "SET_FLIP_CARD",
      payload: { id, isFlipped, decrementScore: true },
    });
  };

  return (
    <div className={`card-container`}>
      {console.log("Card.jsx renderd!")}
      <img
        onClick={() => !hasMatch && clickHandler()}
        className={`card ${flipEffect}`}
        src={isFlipped ? Deck[card] : NonFlippedCard}
        alt="some Alt"
      />
    </div>
  );
};

export default Card;
