export function reducer(state = [], action) {
  const stateClone = { ...state, board: [...state.board] };

  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_TIMER":
      //const time = action.payload !== undefined ? action.payload : state.timer;
      stateClone.timer = action.payload;
      return stateClone;
    case "SET_BOARD":
      return { ...state, board: action.payload };
    case "RESET":
      /*       if (action.payload) {
        return {
          timer: 0,
          score: 1000,
          scoreboard: [...state.scoreboard, action.payload],
          board: [],
        };
      } */
      const scoreLogic = Math.round((state.score / state.timer) * 100);
      return {
        timer: 0,
        score: 1000,
        scoreboard:
          state.timer === 0
            ? [...state.scoreboard]
            : [...state.scoreboard, scoreLogic],
        board: [],
      };
    case "SET_FLIP_CARD":
      // Remove points only when it was clicked by user
      if (action.payload.decrementScore) {
        stateClone.score = stateClone.score - 50;
      }

      stateClone.board.forEach((card) => {
        if (card.id === action.payload.id) {
          card.isFlipped = !card.isFlipped;
        }
      });
      return stateClone;

    case "SET_MATCH_CARD":
      stateClone.score = stateClone.score + 200;
      stateClone.board.forEach((card) => {
        if (card.id === action.payload.id) {
          card.match = action.payload.match;
        }
      });
      return stateClone;
    default:
      return state;
  }
}
