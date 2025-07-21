import React, { useState, useEffect, useRef } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState('');
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerHours, setTimerHours] = useState('');
  const [timerMinutes, setTimerMinutes] = useState('');
  const [timerSeconds, setTimerSeconds] = useState('');
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timerRunning, setTimerRunning] = useState(false);

  const stopwatchRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const current = time.toTimeString().slice(0, 5);
    if (alarms.includes(current)) {
      alert(`⏰ Alarm for ${current}`);
      setAlarms(prev => prev.filter(a => a !== current));
    }
  }, [time, alarms]);

  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(stopwatchRef.current);
    }
    return () => clearInterval(stopwatchRef.current);
  }, [stopwatchRunning]);

  const startTimer = () => {
    let totalSeconds =
      parseInt(timerHours || 0) * 3600 +
      parseInt(timerMinutes || 0) * 60 +
      parseInt(timerSeconds || 0);

    if (isNaN(totalSeconds) || totalSeconds <= 0) return;

    setTimerRunning(true);

    timerRef.current = setInterval(() => {
      totalSeconds -= 1;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setRemainingTime({ hours, minutes, seconds });

      if (totalSeconds <= 0) {
        clearInterval(timerRef.current);
        setTimerRunning(false);
        alert('⏳ Timer Ended!');
      }
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setRemainingTime({ hours: 0, minutes: 0, seconds: 0 });
    setTimerHours('');
    setTimerMinutes('');
    setTimerSeconds('');
    setTimerRunning(false);
  };

  const addAlarm = () => {
    if (newAlarm.trim()) {
      setAlarms([...alarms, newAlarm.trim()]);
      setNewAlarm('');
    }
  };

  const removeAlarm = (index) => {
    const updated = [...alarms];
    updated.splice(index, 1);
    setAlarms(updated);
  };

  const formatStopwatch = (sec) => {
    const minutes = String(Math.floor(sec / 60)).padStart(2, '0');
    const seconds = String(sec % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🕒 Smart Clock Utility</h2>
      <h3 style={styles.timeDisplay}>Current Time: {time.toLocaleTimeString()}</h3>

      <div style={styles.grid}>
        {/* Alarm */}
        <div style={styles.card}>
          <h3>⏰ Alarm</h3>
          <div style={styles.inputGroup}>
            <input
              type="time"
              value={newAlarm}
              onChange={(e) => setNewAlarm(e.target.value)}
              style={styles.input}
            />
            <button onClick={addAlarm} style={styles.button}>Add</button>
          </div>
          <ul>
            {alarms.map((alarm, idx) => (
              <li key={idx} style={styles.listItem}>
                {alarm}
                <button
                  onClick={() => removeAlarm(idx)}
                  style={styles.removeBtn}
                >✕</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Stopwatch */}
        <div style={styles.card}>
          <h3>⏱ Stopwatch</h3>
          <div style={styles.centerText}>{formatStopwatch(stopwatchTime)}</div>
          <div style={styles.buttonGroup}>
            <button onClick={() => setStopwatchRunning(true)} style={styles.button} disabled={stopwatchRunning}>Start</button>
            <button onClick={() => setStopwatchRunning(false)} style={styles.button}>Stop</button>
            <button onClick={() => setStopwatchTime(0)} style={styles.button}>Reset</button>
          </div>
        </div>

        {/* Timer */}
        <div style={styles.card}>
          <h3>⏳ Timer</h3>
          <div style={styles.inputGroup}>
            <input
              type="number"
              placeholder="HH"
              value={timerHours}
              onChange={(e) => setTimerHours(e.target.value)}
              style={styles.timerInput}
              min="0"
            />
            <input
              type="number"
              placeholder="MM"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(e.target.value)}
              style={styles.timerInput}
              min="0"
              max="59"
            />
            <input
              type="number"
              placeholder="SS"
              value={timerSeconds}
              onChange={(e) => setTimerSeconds(e.target.value)}
              style={styles.timerInput}
              min="0"
              max="59"
            />
          </div>
          <div style={styles.buttonGroup}>
            <button onClick={startTimer} style={styles.button} disabled={timerRunning}>Start</button>
            <button onClick={resetTimer} style={styles.button}>Reset</button>
          </div>
          <div style={styles.centerText}>
            {`${String(remainingTime.hours).padStart(2, '0')}:
              ${String(remainingTime.minutes).padStart(2, '0')}:
              ${String(remainingTime.seconds).padStart(2, '0')}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: '30px',
    background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '32px',
    marginBottom: '10px',
  },
  timeDisplay: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '30px',
    maxWidth: '700px',
    margin: 'auto',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px tomato',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    flex: '1',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  removeBtn: {
    background: 'transparent',
    color: 'red',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
  },
  centerText: {
    fontSize: '24px',
    textAlign: 'center',
    marginTop: '10px',
  },
  timerInput: {
    padding: '10px',
    fontSize: '16px',
    width: '60px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
};
