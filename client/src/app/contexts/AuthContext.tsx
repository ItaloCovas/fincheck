import { createContext, useCallback, useState } from 'react';

interface AuthContextProps {
  signedIn: boolean;
  signIn(): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = useCallback(() => {
    setSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
