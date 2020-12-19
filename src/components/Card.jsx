import * as Deck from "../assets/deck/index";
import NonFlippedCard from "../assets/deck/back/back.svg";

const Card = ({ card, isFlipped }) => {
  return (
    <>
      {console.log("Card: ", card)}
      {isFlipped ? (
        <img src={Deck[card]} alt={card} />
      ) : (
        <img src={NonFlippedCard} alt="Unflipped card" />
      )}
    </>
  );
};

export default Card;
