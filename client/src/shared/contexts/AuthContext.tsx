import { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import toast from 'react-hot-toast';
import { SplashScreen } from '../../view/components/SplashScreen';
import { User } from '../entities/user';

interface AuthContextProps {
  signedIn: boolean;

  signOut(): void;

  signIn(accessToken: string): void;

  user: User | undefined;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    localStorage.clear();

    remove();
    setSignedIn(false);
  }, []);

  const { isError, isFetching, isSuccess, remove, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signOut();
    }
  }, [isError, signOut]);

  if (isFetching) {
    return <SplashScreen isLoading={isFetching} />;
  }

  return (
    // isSuccess to avoid blinks
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signIn, signOut, user: data }}
    >
      <SplashScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
