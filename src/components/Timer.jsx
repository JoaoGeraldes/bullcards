import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Timer = () => {
  const timer = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch({ type: "SET_TIMER" }), 1000);
    return () => clearTimeout(timer);
  }, [timer]);

  return timer;
};

export default Timer;
