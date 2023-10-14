import { httpClient } from '../httpClient';

export async function remove(categoryId: string) {
  const { data } = await httpClient.delete(`/categories/${categoryId}`);

  return data;
}
