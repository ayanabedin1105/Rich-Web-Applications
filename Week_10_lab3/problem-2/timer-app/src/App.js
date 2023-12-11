import React, { useState } from "react";
import { interval } from "rxjs";
import { map, takeWhile } from "rxjs/operators";
import "./App.css";

function App() {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    const countdown$ = interval(1000).pipe(
      map((i) => totalSeconds - i - 1),
      takeWhile((i) => i >= 0)
    );

    const sub = countdown$.subscribe((remainingSeconds) => {
      const hrs = Math.floor(remainingSeconds / 3600);
      const mins = Math.floor((remainingSeconds % 3600) / 60);
      const secs = remainingSeconds % 60;
      setHours(hrs);
      setMinutes(mins);
      setSeconds(secs);
    });

    setTimer(sub);
  };

  const stopTimer = () => {
    if (timer) {
      timer.unsubscribe();
      setTimer(null);
    }
  };

  const resetTimer = () => {
    stopTimer(); // Stop the timer if it's running
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="countdown-container">
      <h2>Countdown Timer</h2>
      <div className="input-fields">
        <input
          type="number"
          value={inputHours}
          onChange={(e) => setInputHours(parseInt(e.target.value, 10))}
          placeholder="Hours"
        />
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(parseInt(e.target.value, 10))}
          placeholder="Minutes"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(parseInt(e.target.value, 10))}
          placeholder="Seconds"
        />
      </div>
      <div className="timer-buttons">
        <button onClick={startTimer}>START COUNTDOWN</button>
        <button onClick={stopTimer}>STOP</button>
        <button onClick={resetTimer}>RESET</button>
      </div>
      <div className="timer-output">
        <p>{`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
      </div>
    </div>
  );
}

export default App;
