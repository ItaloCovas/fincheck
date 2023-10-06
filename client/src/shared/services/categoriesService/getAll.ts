import { Category } from '../../entities/category';
import { httpClient } from '../httpClient';

type CategoriesReponse = Array<Category>;

export async function getAll() {
  const { data } = await httpClient.get<CategoriesReponse>('/categories');

  return data;
}
