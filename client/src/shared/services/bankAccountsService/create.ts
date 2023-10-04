import { httpClient } from '../httpClient';

export interface BankAccountParams {
  name: string;

  initialBalance: number;

  color: string;

  type: 'CASH' | 'INVESTMENT' | 'CHECKING';
}

export async function create(bankAccountData: BankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', bankAccountData);

  return data;
}
