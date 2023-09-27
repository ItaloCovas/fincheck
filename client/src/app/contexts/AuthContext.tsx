import { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import toast from 'react-hot-toast';

interface AuthContextProps {
  signedIn: boolean;

  signOut(): void;
  signIn(accessToken: string): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return Boolean(storedAccessToken);
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const { isError } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn
  });

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signOut();
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
