import React from 'react'
import Home from './Home'
import Quiz from './Quiz'

export default function App() {
  const [start, setStart] = React.useState(false)

  function newGame() {
    setStart( oldState => !oldState )
  }

  return (
    <>
      {start ? <Quiz /> : <Home newGame={newGame}/>}
    </>
  )
}
