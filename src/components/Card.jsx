/* import * as Deck from "../assets/deck/index";
import NonFlippedCard from "../assets/deck/back/back.svg"; */
/* import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux"; */

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

  function ParsedCard() {
    const displayCard = isFlipped ? window.DECK.front[card] : window.DECK.back;
    const SVGstring = { __html: displayCard };
    return (
      <div
        dangerouslySetInnerHTML={SVGstring}
        onClick={() => !hasMatch && clickHandler()}
        className={`card `}
      ></div>
    );
  }

  return (
    <div className={`card-container ${flipEffect}`}>
      <ParsedCard />
      {/*  <img
        onClick={() => !hasMatch && clickHandler()}
        className={`card ${flipEffect}`}
        src={isFlipped ? Deck[card] : NonFlippedCard}
        alt="some Alt"
      /> */}
    </div>
  );
};

export default Card;
