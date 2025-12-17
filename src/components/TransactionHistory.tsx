import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  id: number;
  sourceId: number;
  destinationId: number;
  montant: number;
  dateTransaction: string;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Transaction[]>('http://localhost:8096/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Transaction History</h2>
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">#{transaction.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">Account #{transaction.sourceId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">Account #{transaction.destinationId}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">{transaction.montant.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(transaction.dateTransaction)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
