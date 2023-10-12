import { httpClient } from '../httpClient';

export interface EditTransactionParams {
  id: string;

  name: string;

  value: number;

  date: string;

  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...bodyParams }: EditTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, bodyParams);

  return data;
}
