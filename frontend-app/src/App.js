import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Calculator from './pages/Calculator';
import CurrencyConverter from './pages/CurrencyConverter';
import Notes from './pages/Notes';
import Clock from './pages/Clock';             
import Calendar from './pages/Calendar';       
import UnitConverter from './pages/UnitConverter'; 

import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <Router>
      <div className="container mt-4 text-center">
        {/* Theme Toggle Button */}
        <div className="text-end mb-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <h1 className="mb-4">🌐 Multi-Utility App</h1>

        {/* Navigation Links */}
        <nav className="mb-4">
          <Link to="/" className="btn btn-outline-primary mx-2">🧮 Calculator</Link>
          <Link to="/currency" className="btn btn-outline-success mx-2">💱 Currency Converter</Link>
          <Link to="/notes" className="btn btn-outline-warning mx-2">📝 Notes</Link>
          <Link to="/clock" className="btn btn-outline-dark mx-2">🕒 Clock</Link>
          <Link to="/calendar" className="btn btn-outline-info mx-2">📅 Calendar</Link>
          <Link to="/unit-converter" className="btn btn-outline-secondary mx-2">⚖️ Unit Converter</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/clock" element={<Clock />} />               
          <Route path="/calendar" element={<Calendar />} />         
          <Route path="/unit-converter" element={<UnitConverter />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
