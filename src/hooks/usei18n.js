import { useContext } from 'react';
import I18nContext from '../context/i18nContext';

export const useI18n = () => {
  const { currentLocaleCtx, changeLanguageCtx } = useContext(I18nContext);

  return { currentLocale: currentLocaleCtx, changeLanguage: changeLanguageCtx };
};

export default useI18n;
