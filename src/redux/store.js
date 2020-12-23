import { createStore } from "redux";
import { reducer } from "./reducer";

const defaultState = {
  username: "",
  timer: 0,
  score: 1000,
  isMenuOpen: false,
  isAudioMuted: true,
  scoreboard: [
    { username: "Perro", score: 3000 },
    { username: "Perrodwdw", score: 239833 },
    { username: "Perrodwdw", score: 239833 },
    { username: "Perrodwdw", score: 239833 },
    { username: "Perrodwdw", score: 239833 },
    { username: "Perrodwdw", score: 239833 },
    { username: "Perrodwdw", score: 239833 },
    { username: "último", score: 239833 },
  ],
  board: [],
};

export const store = createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* store.dispatch({
  type: "type",
  payload: "payload",
});
 */

console.log(store.getState());
