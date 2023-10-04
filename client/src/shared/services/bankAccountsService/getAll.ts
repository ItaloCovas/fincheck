import { httpClient } from '../httpClient';

interface BankAccountsResponse {
  id: string;

  userId: string;

  name: string;

  initialBalance: number;

  type: 'CASH' | 'INVESTMENT' | 'CHECKING';

  color: string;

  currentBalance: number;
}

export async function getAll() {
  const { data } =
    await httpClient.get<BankAccountsResponse[]>('/bank-accounts');

  return data;
}
