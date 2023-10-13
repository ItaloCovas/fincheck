import { User } from '../../entities/user';
import { httpClient } from '../httpClient';

type MeResponse = User;

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
}
