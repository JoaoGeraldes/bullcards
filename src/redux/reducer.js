export function reducer(state = [], action) {
  const stateClone = { ...state, board: [...state.board] };

  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_TIMER":
      const time = action.payload !== undefined ? action.payload : state.timer;

      return { ...state, timer: time + 1 };
    case "SET_BOARD":
      return { ...state, board: action.payload };
    case "SET_FLIP_CARD":
      //const cardToFlip = state.board.filter((card) => card.key === action.payload.key)

      stateClone.board.forEach((card) => {
        if (card.id === action.payload.id) {
          card.isFlipped = !card.isFlipped;
        }
      });
      return stateClone;

    case "SET_MATCH_CARD":
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
