import { createContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: string | null;

  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem('theme') ?? 'light'
  );
  useEffect(() => {
    const root = window.document.documentElement;

    const removeOldTheme = theme === 'dark' ? 'light' : 'dark';

    root.classList.remove(removeOldTheme!);
    root.classList.add(theme!);

    localStorage.setItem('theme', theme!);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
