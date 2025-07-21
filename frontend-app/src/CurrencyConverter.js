import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    // Fetch exchange rates
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => setRates(res.data.rates))
      .catch(err => console.error('Failed to load exchange rates'));
  }, []);

  const handleConvert = () => {
    if (!amount || !rates[toCurrency] || !rates[fromCurrency]) return;
    const rate = rates[toCurrency] / rates[fromCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>💱 Currency Converter</h1>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />

      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>

      <span style={{ margin: '0 10px' }}>➡️</span>

      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>

      <br /><br />
      <button onClick={handleConvert} style={{ padding: '10px 20px' }}>
        Convert
      </button>

      {convertedAmount && (
        <h2 style={{ marginTop: '20px' }}>
          Result: {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </h2>
      )}
    </div>
  );
}

export default CurrencyConverter;
