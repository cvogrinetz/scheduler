import { useState } from "react";

// FUNCTIONS USED TO TRAVERSE THROUGH THE MODES FOR THE INTERVIEWS DISPLAY
export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      // console.log("replace");
    } else {
      setHistory((prev) => [...prev, newMode]);
      // console.log(history);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
};
