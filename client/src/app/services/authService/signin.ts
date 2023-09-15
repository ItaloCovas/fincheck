import { httpClient } from '../httpClient';

export interface SignInDTO {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

export async function signIn(signInData: SignInDTO) {
  const { data } = await httpClient.post<SignInResponse>(
    '/auth/sign-in',
    signInData
  );

  return data;
}
