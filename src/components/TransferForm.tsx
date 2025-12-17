import React, { useState, useEffect } from 'react';
import { transactionService, compteService } from '../services/api';
import { Compte } from '../types';

interface TransferFormProps {
  onSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSuccess }) => {
  const [accounts, setAccounts] = useState<Compte[]>([]);
  const [sourceId, setSourceId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await compteService.getAll();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sourceId === destinationId) {
      alert('Source and destination accounts must be different');
      return;
    }

    setLoading(true);
    try {
      await transactionService.transfer(
        parseInt(sourceId),
        parseInt(destinationId),
        parseFloat(amount)
      );

      setSourceId('');
      setDestinationId('');
      setAmount('');
      alert('Transfer successful!');
      onSuccess();
    } catch (error) {
      console.error('Error transferring money:', error);
      alert('Transfer failed. Please check account balances.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Transfer Money</h2>
      <p className="text-sm text-gray-600 mb-4">
        💱 Cross-currency transfers will be automatically converted at real-time rates
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Account
          </label>
          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Source Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                Account #{account.id} - {account.type} ({account.solde.toFixed(2)} {account.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Account
          </label>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Destination Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                Account #{account.id} - {account.type} ({account.solde.toFixed(2)} {account.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (in source currency)
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {sourceId && destinationId && (
            <p className="text-xs text-gray-500 mt-1">
              Amount will be converted if currencies differ
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
