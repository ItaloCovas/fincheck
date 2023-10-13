import { httpClient } from '../httpClient';

export interface EditTransactionParams {
  id: string;

  bankAccountId: string;

  categoryId: string;

  name: string;

  value: number;

  date: string;

  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...params }: EditTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
