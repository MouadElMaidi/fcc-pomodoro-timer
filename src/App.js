import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faPlay, faPause, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function App() {
  const [breakLength, setBreakLength] = React.useState(5)
  const [sessionLength, setSessionLength] = React.useState(25)


  //Break controls
  function incBreakLength() {
    setBreakLength(prev => {
      return prev < 60 ? prev + 1 : prev
    })
  }

  function decBreakLength() {
    setBreakLength(prev => {
      return prev > 1 ? prev - 1 : prev
    })
  }

  //Session controls
  function incSessionLength() {
    setSessionLength(prev => {
      return prev < 60 ? prev + 1 : prev
    })
  }

  function decSessionLength() {
    setSessionLength(prev => {
      return prev > 1 ? prev - 1 : prev
    })
  }

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="length-container">
        <div>
          <h2>Break Length</h2>
          <div className="length-picker-container">
            <FontAwesomeIcon icon={faArrowUp} size="xl" onClick={incBreakLength} />
            <h2>{breakLength}</h2>
            <FontAwesomeIcon icon={faArrowDown} size="xl" onClick={decBreakLength} />
          </div>
        </div>
        <div>
          <h2>Session Length</h2>
          <div className='length-picker-container'>
            <FontAwesomeIcon icon={faArrowUp} size="xl" onClick={incSessionLength} />
            <h2>{sessionLength}</h2>
            <FontAwesomeIcon icon={faArrowDown} size="xl" onClick={decSessionLength} />
          </div>
        </div>
      </div>
      <div className="session-container">
        <h2>Session</h2>
        <p className="timer">25:00</p>
      </div>
      <div className='control-icons'>
        <FontAwesomeIcon icon={faPlay} size="2xl" />
        <FontAwesomeIcon icon={faPause} size="2xl" />
        <FontAwesomeIcon icon={faArrowsRotate} size="2xl" />
      </div>
    </div>
  );
}

export default App;
