import { useState } from 'react'

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  
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
