import React, { useState } from "react";
import { interval } from "rxjs";
import { map, takeWhile } from "rxjs/operators";
import "./App.css";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
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

  return (
    <div className="countdown-container">
      <h2>Countdown Timer</h2>
      <div className="input-fields">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Minutes"
        />
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="Seconds"
        />
      </div>
      <div className="timer-buttons">
        <button onClick={startTimer}>START COUNTDOWN</button>
        <button onClick={stopTimer}>STOP</button>
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
