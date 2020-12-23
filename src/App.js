import "./App.css";
import Start from "./components/Start";
import Play from "./components/Play";
import Score from "./components/Score";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  /* ----------------------------- */
  /* ---- MEMOIZED COMPONENTS ---- */
  /* ----------------------------- */
  const ScoreMemoized = useMemo(() => {
    return <Score />;
  }, [state.scoreboard]);

  const PlayMemoized = useMemo(() => {
    return <Play />;
  }, [state.board]);

  return (
    <Router>
      <div className="container">
        {state.isMenuOpen && <Menu />}
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
