import { useLanguage } from '../../shared/hooks/useLanguage';
import ReactCountryFlag from 'react-country-flag';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { handleChangeLanguage, currentLanguage } = useLanguage();

  return (
    <div className={className}>
      {currentLanguage === 'pt' ? (
        <ReactCountryFlag
          countryCode="US"
          svg
          onClick={handleChangeLanguage}
          className="!h-8 !w-8 cursor-pointer"
        />
      ) : (
        <ReactCountryFlag
          countryCode="BR"
          svg
          onClick={handleChangeLanguage}
          className="!h-8 !w-8 cursor-pointer"
        />
      )}
    </div>
  );
}
