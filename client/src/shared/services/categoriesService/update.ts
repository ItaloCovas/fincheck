import { httpClient } from '../httpClient';

export interface EditCategoryParams {
  id: string;

  userId: string;

  name: string;

  icon: string;

  iconUrl?: string;

  iconKey?: string;

  type: 'INCOME' | 'EXPENSE';
}
export async function update({ id, ...params }: EditCategoryParams | FormData) {
  const { data } = await httpClient.put(`/categories/${id}`, params);

  return data;
}
