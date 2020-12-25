import "./App.css";
import Start from "./components/Start";
import Play from "./components/Play";
import Score from "./components/Score";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import GameOverModal from "./components/GameOverModal";

import { fileNames } from "./helpers/cache";

function App() {
  const STATE = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // FETCH ALL SVGS (Playing Cards) AND STORE THEM IN A GLOBAL OBJECT
    async function getAllSVGStrings() {
      window.DECK = { front: null, back: null };

      // GET the back of a card
      const fetchBackCardSVG = await fetch("/deck/back/back.svg");
      const stringSVGBack = await fetchBackCardSVG.text();
      window.DECK.back = stringSVGBack; // Set the back to DECK global object

      // GET all face (front) of cards
      const frontDeckSVGs = fileNames.map(async (filename) => {
        const fetchSVG = await fetch("/deck/front/" + filename);
        const stringSVG = await fetchSVG.text();
        return stringSVG;
      });

      const allPromises = Promise.all(frontDeckSVGs);
      return allPromises;
    }

    /* When the cards are loaded and stored in a global object hides Loading */
    getAllSVGStrings().then((response) => {
      window.DECK.front = response;
      setLoading(false);
    });
  }, []);

  /* ----------------------------- */
  /* ---- MEMOIZED COMPONENTS ---- */
  /* ----------------------------- */
  /* If not memoized, Score component will render everytime we open/close the menu. This behavior is unwanted */
  const ScoreMemoized = useMemo(() => {
    return <Score />;
  }, []);

  /* If not memoized, Play component will render everytime we open/close the menu. This behavior is unwanted */
  const PlayMemoized = useMemo(() => {
    return <Play />;
  }, []);

  return (
    <Router>
      <div className="container">
        {isLoading && <h1 className="gameOverModal heartbeat">Loading</h1>}
        {STATE.isMenuOpen && <Menu />}
        {STATE.isGameOver && <GameOverModal />}
        <h2
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}
        >
          &#x02261; MENU
        </h2>
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/start">
            <Start />
          </Route>
          <Route path="/play">{PlayMemoized}</Route>
          <Route path="/score">{ScoreMemoized}</Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
