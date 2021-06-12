import { useState } from 'react'

export const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      console.log('replace');
    }
    else {
      setHistory(prev => [...prev, newMode]);
      console.log(history);
    }
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, 1)])
      setMode(history[history.length - 2]);

    }
  }





  return { mode, transition, back };
}


// WORKING VERSIONS

// const transition = (mode, replace = false) => {
//   const historyCopy = [...history]

//   historyCopy.push(mode)
//   setMode(mode)
//   setHistory(historyCopy)
//   if(replace === true) {
//     historyCopy.splice(historyCopy.length - 2, 1)
//   }
// }

// const back = () => {
//   const historyCopy = [...history]

//   if (historyCopy.length > 1) {
//     historyCopy.pop()
//     setHistory(historyCopy)
//     setMode(historyCopy[historyCopy.length - 1])
//   }
// }


//  WORK IN PROGRESS
// const transition = (mode, replace = false) => {
//   const historyCopy = [...history]

//   historyCopy.push(mode)
//   setHistory(prev => ([...prev, mode]))
//   setMode(mode)
//   if(replace === true) {
//     historyCopy.splice(historyCopy.length - 2, 1)
//     setMode(mode)
//   }

//   console.log("THIS IS THE MODE-----------", mode)
//   console.log("HISTORY HISTORY--------", historyCopy);
// }

// const back = () => {
//   const historyCopy = [...history]

//   if (historyCopy.length > 1) {
//     historyCopy.pop()
//     setHistory(prev  => ([...prev, mode]))
//     setMode(setMode(historyCopy[historyCopy.length - 1]))
//   }
// }

// return { mode, transition, back };