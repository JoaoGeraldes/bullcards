export function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_BOARD":
      return { ...state, board: action.payload };
    default:
      return state;
  }
}
