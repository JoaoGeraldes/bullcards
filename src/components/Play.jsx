import Card from "./Card";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function deckBuilder() {
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

  let deck = [];
  // eslint-disable-next-line array-callback-return
  CARDS.map((card) => {
    for (let i = 0; i < SUITS.length; i++) {
      deck.push(card + SUITS[i]);
    }
  });

  return deck;
}

function getRandomCardsFromDeck(
  cardsLeft,
  deck,
  selectedCards = [],
  selectedCardsIndex = []
) {
  deck = !deck ? deckBuilder() : deck;

  let randomCardIndex = Math.ceil(Math.random() * deck.length - 1);
  if (randomCardIndex === -0) randomCardIndex = 0;

  console.log(selectedCardsIndex);

  if (cardsLeft < 1) {
    console.log(selectedCards);
    return selectedCards;
  }

  selectedCards.push(deck[randomCardIndex]);
  selectedCardsIndex.push(randomCardIndex);
  deck.splice(randomCardIndex, 1);

  getRandomCardsFromDeck(
    cardsLeft - 1,
    deck,
    selectedCards,
    selectedCardsIndex
  );

  return selectedCards;
}

function Board() {
  const dispatch = useDispatch();

  const randomKey = () => Date.now() + Math.round(Math.random() * 1000000);
  const newDeck = getRandomCardsFromDeck(8);

  let cardCollection = [];

  newDeck.forEach((oneCard) => {
    console.log("forEach: ", oneCard);
    cardCollection.push(
      <Card key={randomKey()} card={oneCard} isFlipped />,
      <Card key={randomKey()} card={oneCard} isFlipped />
    );
  });

  return cardCollection;
}

const Play = () => {
  const dispatch = useDispatch();
  const reduxDispatcher = useCallback(
    () => dispatch({ type: "SET_BOARD", payload: { ok: "dispatcher" } }),
    [dispatch]
  );
  const board = useSelector((state) => state.board);

  useEffect(() => {
    const randomKey = () => Date.now() + Math.round(Math.random() * 1000000);
    const playingCards = getRandomCardsFromDeck(8);

    let cardCollection = [];

    playingCards.forEach((oneCard) => {
      cardCollection.push(
        { key: randomKey(), card: oneCard, isFlipped: false },
        { key: randomKey(), card: oneCard, isFlipped: false }
      );
    });
    dispatch({ type: "SET_BOARD", payload: cardCollection });
  }, []);

  return <>{board.map((card) => card.oneCard)}</>;
};

export default Play;
