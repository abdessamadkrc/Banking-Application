# Banking Application Frontend

A modern React TypeScript frontend for the Banking microservices application with Tailwind CSS.

## Features

- 🏦 **Account Management**: Create, view, edit, and delete bank accounts
- 💸 **Money Transfers**: Transfer funds between accounts
- 💱 **Exchange Rates**: View real-time currency exchange rates
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- ⚡ **TypeScript**: Full type safety and better developer experience

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend services running on port 8098

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## API Endpoints

The frontend connects to the backend gateway at `http://localhost:8098`:

- **Accounts**: `/comptes`
- **Transactions**: `/transactions/transfer`
- **Exchange Rates**: `/reporting/api/rate`

## Project Structure

```
src/
├── components/
│   ├── AccountList.tsx      # Display all accounts
│   ├── AccountForm.tsx      # Create/Edit accounts
│   ├── TransferForm.tsx     # Transfer money
│   └── ExchangeRate.tsx     # Currency exchange
├── services/
│   └── api.ts              # API service layer
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main application
└── index.tsx              # Entry point
```

## Usage

### Creating an Account

1. Select account type (Checking, Savings, or Premium)
2. Enter initial balance
3. Click "Create Account"

### Transferring Money

1. Select source account
2. Select destination account
3. Enter amount
4. Click "Transfer"

### Checking Exchange Rates

1. Select "From" currency
2. Select "To" currency
3. Click "Get Exchange Rate"

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## License

MIT
