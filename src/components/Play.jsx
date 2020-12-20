import Card from "./Card";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deckBuilder,
  getRandomCardsFromDeck,
  shuffleCards,
} from "../helpers/deck";
import Timer from "./Timer";

const Play = () => {
  const dispatch = useDispatch();
  /*     const flipCard = useCallback(() => dispatch({ type: "SET_BOARD" }), [
    dispatch,
  ]); */
  const board = useSelector((state) => state.board);

  // GAME SETTINGS
  const settings = {
    cardFlipDelay: 1000,
    cardPairQuantity: 4,
  };

  useEffect(() => {
    const randomKey = () => Date.now() + Math.round(Math.random() * 10000000);
    const playingCards = getRandomCardsFromDeck(settings.cardPairQuantity);
    const tingSound = document.querySelector("#audio-ting");
    tingSound.play();

    let cardCollection = [];

    playingCards.forEach((oneCard, index) => {
      cardCollection.push(
        {
          key: randomKey(),
          id: randomKey(),
          card: oneCard,
          isFlipped: false,
          match: null,
        },
        {
          key: randomKey(),
          id: randomKey(),
          card: oneCard,
          isFlipped: false,
          match: null,
        }
      );
    });
    dispatch({ type: "SET_BOARD", payload: shuffleCards(cardCollection) });
    dispatch({ type: "SET_TIMER", payload: -1 });
  }, []);

  const currentUnmatchedFlippedCards = board.filter(
    (card) => card.isFlipped === true && card.match === null
  ).length;

  const currentMatchedFlippedCards = board.filter((card) => card.match !== null)
    .length;

  // When the game has ended
  const isGameFinished = () =>
    currentMatchedFlippedCards === settings.cardPairQuantity * 2;
  if (isGameFinished()) {
    const endSound = document.querySelector("#audio-endGame");
    setTimeout(() => endSound.play(), 600);
  }

  const cardClickHandler = currentUnmatchedFlippedCards === 2 ? null : dispatch;

  // Flipped and Unmatched cards filter
  const fluc = board.filter(
    (card) => card.isFlipped === true && card.match === null
  );

  if (fluc.length === 2) {
    if (fluc[fluc.length - 1].card === fluc[fluc.length - 2].card) {
      // Found card match ✅
      const foundMatchSound = document.querySelector("#audio-cardmatch");
      foundMatchSound.currentTime = 0;
      setTimeout(() => foundMatchSound.play(), 300);
      dispatch({
        type: "SET_MATCH_CARD",
        payload: {
          id: fluc[fluc.length - 1].id,
          match: fluc[fluc.length - 2].id,
        },
      });
      dispatch({
        type: "SET_MATCH_CARD",
        payload: {
          id: fluc[fluc.length - 2].id,
          match: fluc[fluc.length - 1].id,
        },
      });
    } else {
      // Not found card match ❌
      setTimeout(() => {
        dispatch({
          type: "SET_FLIP_CARD",
          payload: {
            id: fluc[fluc.length - 1].id,
            isFlipped: false,
          },
        });
        dispatch({
          type: "SET_FLIP_CARD",
          payload: {
            id: fluc[fluc.length - 2].id,
            isFlipped: false,
          },
        });
      }, settings.cardFlipDelay);
    }
  }

  return (
    <>
      <h2>{!isGameFinished() && <Timer />}</h2>
      <div className="board">
        {board.map((card, index) => (
          <Card index={index} onClick={cardClickHandler} {...card} />
        ))}
      </div>
    </>
  );
};

export default Play;
