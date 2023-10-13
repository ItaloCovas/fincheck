import { httpClient } from '../httpClient';

export interface CreateCategoryParams {
  userId: string;

  name: string;

  icon: string;

  iconUrl?: string;

  iconKey?: string;

  type: 'INCOME' | 'EXPENSE';
}

export async function create(categoryData: CreateCategoryParams | FormData) {
  const { data } = await httpClient.post('/categories', categoryData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return data;
}
