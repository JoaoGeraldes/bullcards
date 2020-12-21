import Card from "./Card";
import { useEffect, useCallback, useMemo } from "react";
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

  const BOARD = useSelector((state) => state.board);
  const SCORE = useSelector((state) => state.score);
  const SCOREBOARD = useSelector((state) => state.scoreboard);

  /* GAME SETTINGS */
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

    // Reset redux store
    dispatch({ type: "RESET" });

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
    //dispatch({ type: "SET_BOARD", payload: shuffleCards(cardCollection) });
    dispatch({ type: "SET_BOARD", payload: cardCollection });
  }, []);

  const currentUnmatchedFlippedCards = BOARD.filter(
    (card) => card.isFlipped === true && card.match === null
  ).length;

  const currentMatchedFlippedCards = BOARD.filter((card) => card.match !== null)
    .length;

  // When the game has ended
  const isGameFinished = () =>
    currentMatchedFlippedCards === settings.cardPairQuantity * 2;
  if (isGameFinished()) {
    console.log(SCOREBOARD);
    const endSound = document.querySelector("#audio-endGame");
    setTimeout(() => endSound.play(), 600);
  }

  /* Function to be passed to each card. 
  If there are 2 flipped cards unmatched, 
  a callback click handler will not be sent 
  to each card, send null instead.
  */
  const cardClickHandler = currentUnmatchedFlippedCards === 2 ? null : dispatch;

  // Flipped and Unmatched cards filter
  const fluc = BOARD.filter(
    (card) => card.isFlipped === true && card.match === null
  );

  /* Logic that checks both flipped cards for a match */
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
            /* isFlipped: false, */
          },
        });
        dispatch({
          type: "SET_FLIP_CARD",
          payload: {
            id: fluc[fluc.length - 2].id,
            /*  isFlipped: false, */
          },
        });
      }, settings.cardFlipDelay);
    }
  }

  // Avoiding unnecessary rendering of cards - render only when the redux BOARD changes - memoization
  const MemoizedBoard = useMemo(() => {
    const ok = BOARD.map((card, index) => (
      <Card index={index} onClick={cardClickHandler} {...card} />
    ));
    return ok;
  }, [BOARD]);

  return (
    <>
      {console.log("Play.jsx rendered!")}
      {<h2>{<Timer isGameFinished={isGameFinished()} />}</h2>}
      <div className="board">
        {
          /* BOARD.map((card, index) => (
          <Card index={index} onClick={cardClickHandler} {...card} />
        )) */
          MemoizedBoard
        }
      </div>
      <h1>{SCORE}</h1>
    </>
  );
};

export default Play;
