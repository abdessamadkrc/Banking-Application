import axios from 'axios';
import { Compte, ExchangeRate } from '../types';

// Direct service URLs (bypassing Gateway for now)
const COMPTE_SERVICE_URL = 'http://localhost:8095';
const TRANSACTION_SERVICE_URL = 'http://localhost:8096';
const REPORTING_SERVICE_URL = 'http://localhost:8097';

// Compte Service
export const compteService = {
  getAll: () => axios.get<Compte[]>(`${COMPTE_SERVICE_URL}/comptes`),
  getById: (id: number) => axios.get<Compte>(`${COMPTE_SERVICE_URL}/comptes/${id}`),
  create: (compte: Compte) => axios.post<Compte>(`${COMPTE_SERVICE_URL}/comptes`, compte),
  update: (id: number, compte: Compte) => axios.put<Compte>(`${COMPTE_SERVICE_URL}/comptes/${id}`, compte),
  delete: (id: number) => axios.delete(`${COMPTE_SERVICE_URL}/comptes/${id}`),
};

// Transaction Service
export const transactionService = {
  transfer: (src: number, dest: number, amount: number) =>
    axios.post(`${TRANSACTION_SERVICE_URL}/transactions/transfer`, null, {
      params: { src, dest, amount }
    }),
};

// Reporting Service
export const reportingService = {
  getExchangeRate: (from: string, to: string) =>
    axios.get<ExchangeRate>(`${REPORTING_SERVICE_URL}/api/rate`, {
      params: { from, to }
    }),
};
