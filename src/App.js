import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faPlay, faPause, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function App() {
  const [sessionLength, setSessionLength] = React.useState(25)
  const [breakLength, setBreakLength] = React.useState(5)
  const [timeLeft, setTimeLeft] = React.useState((sessionLength + breakLength) * 60)
  const [timerToggle, setTimerToggle] = React.useState(false)



  //Controls
  function incSessionLength() {
    if (!timerToggle) {
      setSessionLength(prev => {
        return sessionLength < 60 ? prev + 1 : prev
      })
    }
  }
  function decSessionLength() {
    if (!timerToggle) {
      setSessionLength(prev => {
        return sessionLength > 1 ? prev - 1 : prev
      })
    }
  }
  function incbreakTimer() {
    if (!timerToggle) {
      setBreakLength(prev => {
        return breakLength < 60 ? prev + 1 : prev
      })
    }
  }
  function decbreakTimer() {
    if (!timerToggle) {
      setBreakLength(prev => {
        return breakLength > 1 ? prev - 1 : prev
      })
    }
  }
  //Using react useffect to set time left
  React.useEffect(() => {
    setTimeLeft((sessionLength + breakLength) * 60)
  }, [sessionLength, breakLength])

  //Handle clicking play or pausing the timer
  function handleToggleTimer() {
    setTimerToggle(prev => !prev);
  }
  React.useEffect(() => {
    let timer;
    function startTimer() {
      setTimeLeft(prev => prev - 1)
    }
    if (timerToggle === true) {
      if (timeLeft < 0) {
        setTimeLeft((sessionLength + breakLength) * 60)
      }
      else {
        timer = setInterval(startTimer, 1000)
      }
    }
    return function cleanup() {
      clearInterval(timer)
    }
  }, [timerToggle, timeLeft, sessionLength, breakLength])


  function displaySeconds(seconds) {
    if (seconds / 10 < 1) {
      return "0" + seconds
    } else {
      return seconds
    }
  }
  function displayMinutes(minutes) {
    if (minutes / 10 < 1) {
      return "0" + minutes
    }
    else {
      return minutes;
    }
  }

  //Reset function
  function reset() {
    setTimerToggle(false)
    setBreakLength(5)
    setSessionLength(25)
    setTimeLeft(30 * 60)
    audioElement.load()
  }


  //Session time 
  const sessionMinutes = Math.trunc((timeLeft - breakLength * 60) / 60)
  const sessionSeconds = (timeLeft - breakLength * 60) % 60
  //Break Time
  const breakMinutes = Math.trunc(timeLeft / 60)
  const breakSeconds = timeLeft % 60

  const sessionStyle = {
    color: sessionMinutes < 1 ? "red" : "white"
  }
  const breakStyle = {
    color: breakMinutes < 1 ? "red" : "white"
  }

  const audioElement = document.getElementById("beep")
  //Alarm sound
  React.useEffect(() => {
    if (timeLeft === 0 || (sessionMinutes === 0 && sessionSeconds === 0)) {
      audioElement.play()
    }
  }, [timeLeft, audioElement, sessionMinutes, sessionSeconds])

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="length-container">
        <div id="break-label">
          <h2>Break Length</h2>
          <div className="length-picker-container">
            <FontAwesomeIcon icon={faArrowDown} size="xl" onClick={decbreakTimer}
              id="break-decrement" className='controls'
            />
            <h2 id="break-length">{breakLength}</h2>
            <FontAwesomeIcon icon={faArrowUp} size="xl" onClick={incbreakTimer}
              id="break-increment" className='controls'
            />
          </div>
        </div>
        <div id="session-label">
          <h2>Session Length</h2>
          <div className='length-picker-container'>
            <FontAwesomeIcon icon={faArrowDown} size="xl" onClick={decSessionLength}
              id="session-decrement" className='controls' />
            <h2 id="session-length">{sessionLength}</h2>
            <FontAwesomeIcon icon={faArrowUp} size="xl" onClick={incSessionLength}
              id="session-increment" className='controls' />
          </div>
        </div>
      </div>
      {
        timeLeft < breakLength * 60 ?
          <div className="session-container" style={breakStyle}>
            <h2 id="timer-label">Break</h2>
            <p className="timer" id="time-left">
              {displayMinutes(breakMinutes) +
                ":"
                + displaySeconds(breakSeconds)}
            </p>
          </div>
          :
          <div className="session-container" style={sessionStyle}>
            <h2 id="timer-label">Session</h2>
            <p className="timer" id="time-left">
              {displayMinutes(sessionMinutes) +
                ":"
                + displaySeconds(sessionSeconds)}
            </p>
          </div>
      }
      <div className='control-icons'>
        {timerToggle ? <FontAwesomeIcon icon={faPause} size="2xl" onClick={handleToggleTimer}
          id="start_stop" className='controls' /> :
          <FontAwesomeIcon icon={faPlay} size="2xl" onClick={handleToggleTimer}
            id="start_stop" className='controls' />}
        <FontAwesomeIcon icon={faArrowsRotate} size="2xl" onClick={reset} id="reset"
          className='controls'
        />
      </div>
      <audio src="http://ific.uv.es/~jgarcian/probe/phone.wav" id="beep" />
    </div>
  );
}

export default App;



