import "./App.css";
import Start from "./components/Start";
import Play from "./components/Play";
import Score from "./components/Score";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/play">Play</Link>
            </li>
            <li>
              <Link to="/score">Score</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/start">
            <Start />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/score">
            <Score />
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
