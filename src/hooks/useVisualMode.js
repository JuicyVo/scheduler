import { useState } from 'react';

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log ("history is", history)

  const transition = (newMode, replace = false) => {
    // if (newMode !== mode) {
      // setMode(newMode);
    const historyPrefix = (replace ? history.slice(0,history.length-1) : history )
      // if (replace) {
      //   console.log("replacing")
      //   history[history.length - 1] = newMode
      // } else {
      //   history.push(newMode)
      // }
      setHistory([...historyPrefix, newMode]);
    // }
    
  };

  const back = () => {
    if (history.length > 1) {
      // history.pop()
      // setMode(history[history.length - 1]);
    
      setHistory(history.slice(0,history.length-1));
    }
  };

  return {
    mode:history[history.length-1],
    transition,
    back
  };
}
