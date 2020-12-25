import Card from "./Card";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomCardsFromDeck,
  shuffleCards,
  isDeckLoaded,
  redirectUserToMainPage,
} from "../helpers/deck";
import Timer from "./Timer";
import { Redirect, Link } from "react-router-dom";
/* import { Link, Redirect } from "react-router-dom"; */
import { playSound } from "../helpers/audio";

/* GAME SETTINGS */
const settings = {
  cardFlipDelay: 1000,
  cardPairQuantity: 8,
  shuffleDeck: false,
};

const Play = () => {
  const dispatch = useDispatch();
  const BOARD = useSelector((state) => state.board);
  const SCORE = useSelector((state) => state.score);
  const IS_GAMEOVER = useSelector((state) => state.isGameOver);
  /*   const SCOREBOARD = useSelector((state) => state.scoreboard);
  const TIMER = useSelector((state) => state.timer); */

  useEffect(() => {
    if (!isDeckLoaded()) {
      redirectUserToMainPage();
    }

    const randomKey = () => Date.now() + Math.round(Math.random() * 10000000);
    const playingCards = getRandomCardsFromDeck(settings.cardPairQuantity);

    playSound("#audio-ting");

    let cardCollection = [];

    // RESET board
    setBoard();

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

    setBoard({
      type: "SET_BOARD",
      payload: settings.shuffleDeck
        ? shuffleCards(cardCollection)
        : cardCollection,
    });
  }, []);

  /* ----------------- */
  /* ---- filters ---- */
  /* ----------------- */
  const currentMatchedFlippedCards = BOARD.filter((card) => card.match !== null)
    .length;

  const currentUnmatchedFlippedCards = BOARD.filter(
    (card) => card.isFlipped === true && card.match === null
  ).length;

  // Flipped and Unmatched cards filter
  const fluc = BOARD.filter(
    (card) => card.isFlipped === true && card.match === null
  );

  const areAllCardsFlippedAndMatched =
    currentMatchedFlippedCards === settings.cardPairQuantity * 2;

  /* --------------------- */
  /* ---- dispatchers ---- */
  /* --------------------- */

  function setBoard(action) {
    // Reset redux BOARD to custom payload
    if (action) {
      dispatch(action);
      return;
    }
    // Reset redux BOARD to default
    dispatch({ type: "RESET" });
  }

  function setGameOver() {
    dispatch({ type: "SET_GAMEOVER" });
  }

  /* Function to be passed to each card. 
  If there are 2 flipped cards unmatched, 
  a callback click handler will not be sent 
  to each card, send null instead.
  */
  const cardClickHandler = currentUnmatchedFlippedCards === 2 ? null : dispatch;

  function setFlippedAndMatchedCards() {
    /* Logic that checks both flipped cards for a match */
    if (fluc.length === 2) {
      if (fluc[fluc.length - 1].card === fluc[fluc.length - 2].card) {
        // Found card match ✅
        playSound("#audio-cardmatch", 300);
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
  }

  const memoCard = useCallback(
    (index, props, callback) => (
      <Card index={index} onClick={callback} {...props} />
    ),
    [cardClickHandler]
  );

  // Avoiding unnecessary rendering of cards - render only when the redux BOARD changes - memoization
  const MemoizedBoard = useMemo(() => {
    const boardMap = BOARD.map((card, index) =>
      /* <Card index={index} onClick={cardClickHandler} {...card} /> */
      memoCard(index, { ...card }, cardClickHandler)
    );
    return boardMap;
  }, [BOARD]);

  function gameOverVerifier() {
    if (areAllCardsFlippedAndMatched) {
      if (IS_GAMEOVER) return;
      setGameOver();

      playSound("#audio-endGame", 600);
    } else {
      setFlippedAndMatchedCards();
    }
  }

  // Execute Game Over Verifier
  gameOverVerifier();

  return (
    <>
      <div className="game-header">
        <div>
          &#x0221E; &nbsp;
          {<Timer isGameFinished={areAllCardsFlippedAndMatched} />}
        </div>
        <div>{SCORE} &#x02606;</div>
      </div>

      <div className="board">{MemoizedBoard}</div>
    </>
  );
};

export default Play;
