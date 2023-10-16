import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptJSON from './locales/pt/pt.json';
import enJSON from './locales/en/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { ...ptJSON },
      en: { ...enJSON }
    },
    lng: 'pt'
  });
