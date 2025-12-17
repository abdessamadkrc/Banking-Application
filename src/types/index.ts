export interface Compte {
  id?: number;
  type: string;
  solde: number;
}

export interface Transaction {
  id?: number;
  sourceId: number;
  destinationId: number;
  montant: number;
  dateTransaction?: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}
