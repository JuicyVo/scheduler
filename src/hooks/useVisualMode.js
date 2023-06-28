import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (newMode !== mode) {
      setMode(newMode);

      if (replace) {
        console.log("replacing")
        history[history.length - 1] = newMode
      } else {
        history.push(newMode)
      }
      setHistory([...history]);
    }
    
  };

  const back = () => {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1]);
      setHistory([...history]);
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