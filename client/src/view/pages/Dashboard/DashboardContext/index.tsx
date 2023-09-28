import { createContext, useCallback, useState } from 'react';

interface DashboardContextProps {
  areValuesVisible: boolean;

  toggleValueVisibility(): void;
}

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValueVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
