'use client';

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({
  className
}: ThemeSwitcherProps): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
      console.log('isdark');
      setDarkMode(true);
    } else {
      console.log('isnt');

      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function handleToggleTheme(): void {
    setDarkMode((prevMode) => !prevMode);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className={className}>
      {darkMode ? (
        <SunIcon
          width={25}
          height={25}
          onClick={handleToggleTheme}
          className="text-[#F3C432] cursor-pointer hover:text-[#3F4347] hover:transition hover:ease-in-out hover:duration-500"
        />
      ) : (
        <MoonIcon
          width={25}
          height={25}
          onClick={handleToggleTheme}
          className="text-[#3F4347] cursor-pointer hover:text-[#F3C432] hover:transition hover:ease-in-out hover:duration-500"
        />
      )}
    </div>
  );
}
