import { createStore } from "redux";
import { reducer } from "./reducer";

const defaultState = {
  username: "",
  timer: 0,
  scoreboard: [],
  board: [],
};

export const store = createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* store.dispatch({
  type: "SET_USERNAME",
  payload: "Player",
});
 */

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
