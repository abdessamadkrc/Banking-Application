import React, { useState } from 'react';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';
import TransferForm from './components/TransferForm';
import ExchangeRate from './components/ExchangeRate';
import { Compte } from './types';

function App() {
  const [refreshAccounts, setRefreshAccounts] = useState(false);
  const [editAccount, setEditAccount] = useState<Compte | null>(null);

  const handleAccountSuccess = () => {
    setRefreshAccounts(!refreshAccounts);
  };

  const handleAccountSelect = (account: Compte) => {
    setEditAccount(account);
  };

  const handleCancelEdit = () => {
    setEditAccount(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏦 Banking Application
          </h1>
          <p className="text-gray-600">Manage your accounts and transactions</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AccountForm
              onSuccess={handleAccountSuccess}
              editAccount={editAccount}
              onCancelEdit={handleCancelEdit}
            />
            <TransferForm onSuccess={handleAccountSuccess} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AccountList
              onRefresh={refreshAccounts}
              onAccountSelect={handleAccountSelect}
            />
            <ExchangeRate />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Connected to Microservices: CompteService (8095) | TransactionService (8096) | ReportingService (8097)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
