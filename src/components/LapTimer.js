import React, { useState, useEffect, useRef } from 'react';

const LapTimer = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, centiseconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime(prevTime => {
        let { minutes, seconds, centiseconds } = prevTime;
        centiseconds++;
        if (centiseconds === 100) {
          centiseconds = 0;
          seconds++;
        }
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        return { minutes, seconds, centiseconds };
      });
    }, 10);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime({ minutes: 0, seconds: 0, centiseconds: 0 });
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    return `${String(time).padStart(2, '0')}`;
  };

  return (
    <div>
      <div>
        <span>{formatTime(time.minutes)}:</span>
        <span>{formatTime(time.seconds)}:</span>
        <span>{formatTime(time.centiseconds)}</span>
      </div>
      <button onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={recordLap} disabled={!isRunning}>
        Lap
      </button>
      <button onClick={resetTimer}>
        Reset
      </button>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            {formatTime(lap.minutes)}:{formatTime(lap.seconds)}:{formatTime(lap.centiseconds)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LapTimer;