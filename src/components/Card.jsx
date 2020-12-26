import { useMemo } from "react";

const Card = ({ match, id, card, isFlipped, onClick: flipCard }) => {
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

  const ParseCardMemoized = useMemo(() => ParsedCard(), [
    isFlipped,
    isActionBlocked,
    match,
  ]);

  return (
    <div className={`card-container ${flipEffect}`}>{ParseCardMemoized}</div>
  );
};

export default Card;
