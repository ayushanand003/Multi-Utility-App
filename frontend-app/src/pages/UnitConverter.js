import React, { useState } from 'react';

function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [input, setInput] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState('');

  const units = {
    length: ['meter', 'kilometer', 'mile', 'foot', 'inch'],
    weight: ['gram', 'kilogram', 'pound', 'ounce'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  };

  const convert = () => {
    let val = parseFloat(input);
    if (isNaN(val)) {
      setResult('Enter a valid number');
      return;
    }

    let output = 0;

    if (category === 'length') {
      const conversions = {
        meter: 1,
        kilometer: 0.001,
        mile: 0.000621371,
        foot: 3.28084,
        inch: 39.3701
      };
      output = val / conversions[fromUnit] * conversions[toUnit];
    } else if (category === 'weight') {
      const conversions = {
        gram: 1,
        kilogram: 0.001,
        pound: 0.00220462,
        ounce: 0.035274
      };
      output = val / conversions[fromUnit] * conversions[toUnit];
    } else if (category === 'temperature') {
      if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') output = (val * 9 / 5) + 32;
        else if (toUnit === 'kelvin') output = val + 273.15;
        else output = val;
      } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') output = (val - 32) * 5 / 9;
        else if (toUnit === 'kelvin') output = (val - 32) * 5 / 9 + 273.15;
        else output = val;
      } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') output = val - 273.15;
        else if (toUnit === 'fahrenheit') output = (val - 273.15) * 9 / 5 + 32;
        else output = val;
      }
    }

    setResult(`${output.toFixed(4)} ${toUnit}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📏 Unit Converter</h2>

      <div style={styles.card}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFromUnit(units[e.target.value][0]);
              setToUnit(units[e.target.value][1]);
              setInput('');
              setResult('');
            }}
            style={styles.select}
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} style={styles.select}>
              {units[category].map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} style={styles.select}>
              {units[category].map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Value</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            style={styles.input}
          />
        </div>

        <button onClick={convert} style={styles.button}>Convert</button>

        {result && <div style={styles.result}>Result: <strong>{result}</strong></div>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#3f51b5',
  },
  card: {
    background: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#3f51b5',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  result: {
    marginTop: '20px',
    fontSize: '1.1em',
    color: '#333',
  },
  row: {
    display: 'flex',
    gap: '15px',
  }
};

export default UnitConverter;
