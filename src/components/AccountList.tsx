import React, { useEffect, useState } from 'react';
import { compteService } from '../services/api';
import { Compte } from '../types';

interface AccountListProps {
  onRefresh: boolean;
  onAccountSelect: (account: Compte) => void;
}

const AccountList: React.FC<AccountListProps> = ({ onRefresh, onAccountSelect }) => {
  const [accounts, setAccounts] = useState<Compte[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await compteService.getAll();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [onRefresh]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await compteService.delete(id);
        fetchAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading accounts...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Accounts</h2>
      {accounts.length === 0 ? (
        <p className="text-gray-500">No accounts found. Create one to get started!</p>
      ) : (
        <div className="space-y-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Account #{account.id}</p>
                <p className="text-sm text-gray-600">Currency: {account.type}</p>
                <p className="text-lg font-bold text-green-600">{account.solde.toFixed(2)} {account.type}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onAccountSelect(account)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(account.id!)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountList;
