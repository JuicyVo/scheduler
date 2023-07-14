import { useState } from 'react';

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace = false) => {

    const historyPrefix = (replace ? history.slice(0, history.length - 1) : history)

    setHistory([...historyPrefix, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
    }
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
}
