import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const {
    i18n: { changeLanguage, language }
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return { handleChangeLanguage, currentLanguage };
}
