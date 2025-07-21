import React, { useState, useEffect } from 'react';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          num1: parseFloat(num1),
          num2: parseFloat(num2),
          operation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setResult(data.result);
        fetchHistory();
      }
    } catch (err) {
      setError('Failed to connect to backend');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculate/history');
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history');
    }
  };

  const handleClearHistory = async () => {
    try {
      await fetch('http://localhost:5000/api/calculate/history', { method: 'DELETE' });
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">🧮 Calculator</h2>

      <input
        type="number"
        placeholder="First number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        className="form-control mb-2"
      />

      <input
        type="number"
        placeholder="Second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        className="form-control mb-3"
      />

      <div className="btn-group mb-3 w-100">
        <button onClick={() => setOperation('add')} className={`btn ${operation === 'add' ? 'btn-primary' : 'btn-outline-primary'}`}>+</button>
        <button onClick={() => setOperation('subtract')} className={`btn ${operation === 'subtract' ? 'btn-primary' : 'btn-outline-primary'}`}>−</button>
        <button onClick={() => setOperation('multiply')} className={`btn ${operation === 'multiply' ? 'btn-primary' : 'btn-outline-primary'}`}>×</button>
        <button onClick={() => setOperation('divide')} className={`btn ${operation === 'divide' ? 'btn-primary' : 'btn-outline-primary'}`}>÷</button>
      </div>

      <button className="btn btn-success mb-3 w-100" onClick={handleCalculate}>
        ✅ Calculate
      </button>

      {error && <div className="alert alert-danger py-1">{error}</div>}
      {result !== null && <h4 className="text-success">Result: {result}</h4>}

      <hr />

      <h5 className="mb-3">📜 History</h5>
      <button className="btn btn-danger mb-3 w-100" onClick={handleClearHistory}>
        🧼 Clear History
      </button>

      <ul className="list-group">
        {history.map((entry, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            <span>{entry.num1} {symbol(entry.operation)} {entry.num2}</span>
            <strong>= {entry.result}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function symbol(op) {
  switch (op) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    default: return '?';
  }
}

export default Calculator;
