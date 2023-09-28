import { httpClient } from '../httpClient';

export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

export async function signUp(signUpData: SignUpDTO) {
  const { data } = await httpClient.post<SignUpResponse>(
    '/auth/sign-up',
    signUpData
  );

  return data;
}
