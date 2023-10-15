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

export async function update(params: EditCategoryParams | FormData) {
  const formData = params as FormData;
  const id = formData.get('id');

  const { data } = await httpClient.patch(`/categories/${id}`, params);

  return data;
}
