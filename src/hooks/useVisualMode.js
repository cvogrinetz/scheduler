import { useState } from 'react'

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log("MODE MODE", mode);
  // console.log("SET THAT MDOE", setMode);
  console.log("HISTORY", history)
  // console.log("SET THAT HISTORY", setHistory);

  const transition = (mode, replace = false) => {
    const historyCopy = [...history]

    historyCopy.push(mode)
    setMode(mode)
    setHistory(historyCopy)
    if(replace === true) {
      historyCopy.splice(historyCopy.length - 2, 1)
    }
  }
  
  const back = () => {
    const historyCopy = [...history]

    if (historyCopy.length > 1) {
      historyCopy.pop()
      setHistory(historyCopy)
      setMode(historyCopy[historyCopy.length - 1])
    }
  }

  return { mode, transition, back };
}









// export function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   console.log("MODE MODE", mode);
//   // console.log("SET THAT MDOE", setMode);
//   console.log("HISTORY", history)
//   // console.log("SET THAT HISTORY", setHistory);

//   const transition = (mode, replace = false) => {
//     history.push(mode)
//     setMode(mode)
//     setHistory(history)
//     if(replace === true) {
//       history.splice(history.length - 2, 1)
//     }
//   }
  
//   const back = () => {
//     if (history.length > 1) {
//       history.pop()
//       setHistory(history)
//       setMode(history[history.length - 1])
//     }
//   }

//   return { mode, transition, back };
// }



