import { useState, useEffect } from 'react'
import './App.css'

function App() {

const [time, setTime] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const [laps, setLaps] = useState([])
const [darkMode, setDarkMode] = useState(true)

useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

useEffect(()=> {
  const savedTime = localStorage.getItem("time")
    if (savedTime){
    setTime(Number(savedTime))
     }
  }, [])

useEffect(() => {
  localStorage.setItem("time",time)
  }, [time])

  


    function handleStart(){
      setIsRunning(true)
    }

    function handleStop(){
      setIsRunning(false)
    }

    function handleReset() {
  setTime(0)
  setIsRunning(false)
}

function formatTime(ms){
  const hours = Math.floor(ms/3600000)
  const minutes = Math.floor(ms%3600000/60000)
  const seconds = Math.floor(ms%60000/1000)
  const milliseconds = Math.floor((ms % 1000) / 10)

  const secs = seconds%60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`
}

function handleLap(){
  setLaps([...laps, time])
  
}
function toggleTheme(){
  setDarkMode(!darkMode)
}


return (
  <div className={`container ${darkMode ? "dark" : "light"}`}>

    <button className="theme-btn" onClick={toggleTheme}>
    {darkMode ? "Light Mode" : "Dark Mode"}
  </button>

    <h1>STOPWATCH</h1>
    <h2 className="time">{formatTime(time)}</h2>

    <div className="button">
      <button 
        onClick={handleStart} 
        disabled={isRunning} 
        className="start-btn"
      >
        Start
      </button>

      <button 
        onClick={handleStop} 
        disabled={!isRunning} 
        className="stop-btn"
      >
        Stop
      </button>

      <button 
        onClick={handleReset} 
        className="reset-btn"
      >
        Reset
      </button>

      <button onClick={handleLap}>
        Lap
      </button>
    </div>

    <ul>
      {laps.map((lap, index) => (
        <li key={index}>
          {formatTime(lap)}
        </li>
      ))}
    </ul>
  </div>
)
}
export default App
