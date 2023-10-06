import { httpClient } from '../httpClient';

export interface EditBankAccountParams {
  id: string;

  name: string;

  initialBalance: number;

  color: string;

  type: 'CASH' | 'INVESTMENT' | 'CHECKING';
}

export async function update({ id, ...params }: EditBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}
