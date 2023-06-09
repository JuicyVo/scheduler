import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
 
  const transition = (newMode) => {
    setMode(newMode);
    setHistory(prevHistory => [...prevHistory, newMode]);
  };
  
  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return {
    mode,
    transition,
    back
  };
}


// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);

//   function transition(mode, replace = false) {
//     /* ... */
//   }
//   function back() { /* ... */ }

//   return { mode, transition, back };
// };