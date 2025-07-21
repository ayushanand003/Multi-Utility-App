import React, { useState } from 'react';
import CalendarLib from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState('');
  const [jumpInput, setJumpInput] = useState('');

  const formatDateKey = (dateObj) => dateObj.toISOString().split('T')[0];

  const handleAddEvent = () => {
    const dateKey = formatDateKey(date);
    if (!newEvent.trim()) return;

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent.trim()],
    }));
    setNewEvent('');
  };

  const handleRemoveEvent = (dateKey, index) => {
    const updated = [...events[dateKey]];
    updated.splice(index, 1);
    setEvents((prev) => ({
      ...prev,
      [dateKey]: updated,
    }));
  };

  const handleJump = () => {
    const parsed = new Date(jumpInput);
    if (!isNaN(parsed)) {
      setDate(parsed);
      setViewDate(parsed);
      setJumpInput('');
    }
  };

  const handleMonthChange = (offset) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
    setDate(newDate);
  };

  const dateKey = formatDateKey(date);

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f7f9fc',
      borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      textAlign: 'center',
    },
    heading: {
      marginBottom: '25px',
      color: '#2d3748',
      fontSize: '28px',
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    monthInput: {
      padding: '8px 12px',
      fontSize: '16px',
      border: '2px solid #cbd5e0',
      borderRadius: '8px',
      outline: 'none',
    },
    button: {
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      fontWeight: 'bold',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: '0.3s',
    },
    calendarWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    eventBox: {
      marginTop: '30px',
      background: '#fff',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    input: {
      padding: '10px',
      fontSize: '15px',
      width: '70%',
      borderRadius: '8px',
      border: '2px solid #cbd5e0',
      marginRight: '10px',
      outline: 'none',
    },
    addBtn: {
      backgroundColor: '#48bb78',
      color: 'white',
      padding: '10px 14px',
      fontSize: '15px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    list: {
      marginTop: '15px',
      listStyleType: 'none',
      paddingLeft: 0,
    },
    listItem: {
      marginBottom: '10px',
      padding: '8px 12px',
      background: '#edf2f7',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    removeBtn: {
      color: '#e53e3e',
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
    },
    arrows: {
      fontSize: '20px',
      padding: '0 10px',
      cursor: 'pointer',
      color: '#2b6cb0',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📅 Calendar with Event Reminders</h2>

      <div style={styles.nav}>
        <span style={styles.arrows} onClick={() => handleMonthChange(-1)}>&lt;</span>
        <strong>{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>
        <span style={styles.arrows} onClick={() => handleMonthChange(1)}>&gt;</span>
      </div>

      <div style={styles.nav}>
        <input
          type="month"
          value={jumpInput}
          onChange={(e) => setJumpInput(e.target.value)}
          style={styles.monthInput}
        />
        <button style={styles.button} onClick={handleJump}>Go</button>
      </div>

      <div style={styles.calendarWrapper}>
        <CalendarLib
          onChange={setDate}
          value={date}
          activeStartDate={viewDate}
        />
      </div>

      <div style={styles.eventBox}>
        <h3>📌 Add your event</h3>
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="What's the event?"
          style={styles.input}
        />
        <button onClick={handleAddEvent} style={styles.addBtn}>Add Event</button>

        <ul style={styles.list}>
          {(events[dateKey] || []).map((evt, idx) => (
            <li key={idx} style={styles.listItem}>
              {evt}
              <button onClick={() => handleRemoveEvent(dateKey, idx)} style={styles.removeBtn}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
