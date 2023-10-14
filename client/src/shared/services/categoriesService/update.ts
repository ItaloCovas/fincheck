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
  if (params instanceof FormData && params.has('id')) {
    return;
  }

  const { id, ...restParams } = params as EditCategoryParams;

  const { data } = await httpClient.patch(`/categories/${id}`, restParams);

  return data;
}
