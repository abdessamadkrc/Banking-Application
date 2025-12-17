import React, { useState } from 'react';
import { reportingService } from '../services/api';

const ExchangeRate: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'MAD'];

  const handleGetRate = async () => {
    setLoading(true);
    try {
      const response = await reportingService.getExchangeRate(fromCurrency, toCurrency);
      setRate(response.data.rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      alert('Failed to fetch exchange rate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Exchange Rate</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGetRate}
          disabled={loading}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Get Exchange Rate'}
        </button>

        {rate !== null && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-center text-lg">
              <span className="font-bold">{fromCurrency}</span> to{' '}
              <span className="font-bold">{toCurrency}</span>
            </p>
            <p className="text-center text-3xl font-bold text-purple-600 mt-2">
              {rate.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRate;
