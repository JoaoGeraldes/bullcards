import { createStore } from "redux";
import { reducer } from "./reducer";

const defaultState = {
  username: "",
  timer: 0,
  score: 1000,
  isMenuOpen: false,
  isAudioMuted: true,
  isGameOver: false,
  scoreboard: [
    { username: "Dummy", score: 20000 },
    { username: "Funny", score: 20000 },
    { username: "Sunny", score: 18000 },
    { username: "Muddy", score: 22000 },
    { username: "Punny", score: 17000 },
  ],
  board: [],
};

export const store = createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* console.log(store.getState()); */
