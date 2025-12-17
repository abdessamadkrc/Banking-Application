import React, { useState, useEffect } from 'react';
import { compteService } from '../services/api';
import { Compte } from '../types';

interface AccountFormProps {
  onSuccess: () => void;
  editAccount?: Compte | null;
  onCancelEdit: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ onSuccess, editAccount, onCancelEdit }) => {
  const [type, setType] = useState('');
  const [solde, setSolde] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editAccount) {
      setType(editAccount.type);
      setSolde(editAccount.solde.toString());
    }
  }, [editAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accountData: Compte = {
        type,
        solde: parseFloat(solde),
      };

      if (editAccount) {
        await compteService.update(editAccount.id!, accountData);
      } else {
        await compteService.create(accountData);
      }

      setType('');
      setSolde('');
      onSuccess();
      if (editAccount) onCancelEdit();
    } catch (error) {
      console.error('Error saving account:', error);
      alert('Failed to save account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editAccount ? 'Edit Account' : 'Create New Account'}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        💱 Transfers between different currencies will be automatically converted using real-time exchange rates
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="MAD">MAD - Moroccan Dirham</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Balance
          </label>
          <input
            type="number"
            step="0.01"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            required
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : editAccount ? 'Update Account' : 'Create Account'}
          </button>
          {editAccount && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
