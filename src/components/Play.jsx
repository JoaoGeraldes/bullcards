import Card from "./Card";
import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomCardsFromDeck, shuffleCards } from "../helpers/deck";
import Timer from "./Timer";
import { Link, Redirect } from "react-router-dom";

/* GAME SETTINGS */
const settings = {
  cardFlipDelay: 1000,
  cardPairQuantity: 4,
  shuffleDeck: false,
};

const Play = () => {
  const dispatch = useDispatch();
  const BOARD = useSelector((state) => state.board);
  const SCORE = useSelector((state) => state.score);
  const SCOREBOARD = useSelector((state) => state.scoreboard);
  const TIMER = useSelector((state) => state.timer);

  const currentMatchedFlippedCards = BOARD.filter((card) => card.match !== null)
    .length;

  const currentUnmatchedFlippedCards = BOARD.filter(
    (card) => card.isFlipped === true && card.match === null
  ).length;

  // Flipped and Unmatched cards filter
  const fluc = BOARD.filter(
    (card) => card.isFlipped === true && card.match === null
  );

  const isGameFinished =
    currentMatchedFlippedCards === settings.cardPairQuantity * 2;

  useEffect(() => {
    const randomKey = () => Date.now() + Math.round(Math.random() * 10000000);
    const playingCards = getRandomCardsFromDeck(settings.cardPairQuantity);
    const tingSound = document.querySelector("#audio-ting");
    tingSound.play();

    let cardCollection = [];

    // Reset redux store
    dispatch({ type: "RESET" });

    // Each card will be repeated in the array
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
    dispatch({
      type: "SET_BOARD",
      payload: settings.shuffleDeck
        ? shuffleCards(cardCollection)
        : cardCollection,
    });
  }, []);

  /* Function to be passed to each card. 
  If there are 2 flipped cards unmatched, 
  a callback click handler will not be sent 
  to each card, send null instead.
  */
  const cardClickHandler = currentUnmatchedFlippedCards === 2 ? null : dispatch;

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
          },
        });
        dispatch({
          type: "SET_FLIP_CARD",
          payload: {
            id: fluc[fluc.length - 2].id,
          },
        });
      }, settings.cardFlipDelay);
    }
  }

  // Avoiding unnecessary rendering of cards - render only when the redux BOARD changes - memoization
  const MemoizedBoard = useMemo(() => {
    const boardMap = BOARD.map((card, index) => (
      <Card index={index} onClick={cardClickHandler} {...card} />
    ));
    return boardMap;
  }, [BOARD, cardClickHandler]);

  // When the game has ended
  if (isGameFinished) {
    const endSound = document.querySelector("#audio-endGame");
    setTimeout(() => endSound.play(), 600);
  }

  return (
    <>
      {console.log("Play.jsx rendered!")}

      <div className="game-header">
        <div>
          &#x0221E; &nbsp;
          {<Timer isGameFinished={isGameFinished} />}
        </div>
        <div>{SCORE} &#x02606;</div>
      </div>

      <div className="board">{MemoizedBoard}</div>
    </>
  );
};

export default Play;
