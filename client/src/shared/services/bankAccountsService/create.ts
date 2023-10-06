import { httpClient } from '../httpClient';

export interface CreateBankAccountParams {
  name: string;

  initialBalance: number;

  color: string;

  type: 'CASH' | 'INVESTMENT' | 'CHECKING';
}

export async function create(bankAccountData: CreateBankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', bankAccountData);

  return data;
}
