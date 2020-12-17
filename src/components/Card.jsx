import * as Deck from "../assets/deck/index";

const Card = ({ cardIndex, suitIndex }) => {
  const CARDS = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ];
  const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];

  return (
    <>
      <img src={Deck[CARDS[0] + SUITS[0]]} alt={Deck[CARDS[0] + SUITS[0]]} />
    </>
  );
};

export default Card;
