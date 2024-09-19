import { useEffect, useState } from 'react';
import { i18n } from '../i18n/i18n';

export const useLocale = ({ language }) => {
  const [locale, setLocale] = useState('pt-br');

  const changeLanguage = async newLanguage => {
    i18n.activate(newLanguage);
    setLocale(newLanguage);
  };

  useEffect(() => {
    if (language !== null) {
      changeLanguage(language).then();
    }
  }, [language]);

  return { locale, changeLanguage };
};
