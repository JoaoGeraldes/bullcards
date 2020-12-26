import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Timer = ({ isGameFinished }) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isGameFinished) {
      dispatch({ type: "SET_TIMER", payload: counter });
      return;
    }
    const t = setTimeout(() => setCounter(counter + 1), 1000);
    return () => clearTimeout(t);
  }, [counter, isGameFinished, dispatch]);

  return counter;
};

export default Timer;
