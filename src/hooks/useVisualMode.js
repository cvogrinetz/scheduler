import { useState } from "react";

// FUNCTIONS USED TO TRAVERSE THROUGH THE MODES FOR THE INTERVIEWS DISPLAY
export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // TRAVERSE THROUGH THE STATE STACK
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  // GO BACK TO PREVIOUS STATE STACK
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
};
