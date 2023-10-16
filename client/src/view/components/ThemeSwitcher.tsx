'use client';

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '../../shared/hooks/useTheme';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({
  className
}: ThemeSwitcherProps): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={className}>
      {theme === 'dark' ? (
        <SunIcon
          width={25}
          height={25}
          onClick={handleThemeSwitch}
          className="text-[#F3C432] cursor-pointer hover:text-[#3F4347] hover:transition hover:ease-in-out hover:duration-500"
        />
      ) : (
        <MoonIcon
          width={25}
          height={25}
          onClick={handleThemeSwitch}
          className="text-[#3F4347] cursor-pointer hover:text-[#F3C432] hover:transition hover:ease-in-out hover:duration-500"
        />
      )}
    </div>
  );
}
