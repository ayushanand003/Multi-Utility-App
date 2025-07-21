import React, { useState } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencyRates = {
    USD: { INR: 83.3, EUR: 0.92 },
    INR: { USD: 0.012, EUR: 0.011 },
    EUR: { USD: 1.09, INR: 90.4 },
  };

  const handleConvert = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      const rate = currencyRates[fromCurrency][toCurrency];
      const result = parseFloat(amount) * rate;
      setConvertedAmount(result.toFixed(2));
    }
  };

  return (
    <div>
      <h2 className="mb-4">💱 Currency Converter</h2>

      <div className="d-flex justify-content-center gap-3 mb-3">
        <input
          type="number"
          placeholder="Amount"
          className="form-control w-25"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="form-select w-auto"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
        <span className="align-self-center">→</span>
        <select
          className="form-select w-auto"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={handleConvert}>
        Convert
      </button>

      {convertedAmount && (
        <div className="mt-4 alert alert-info">
          Converted Amount: <strong>{convertedAmount} {toCurrency}</strong>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
