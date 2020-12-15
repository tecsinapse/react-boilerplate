import { Fragment, useEffect, useState } from 'react';
import { provideI18nLanguageContext } from '../i18n/provideI18nLanguageContext';
import { i18n } from '../i18n/i18n';

export const useLocale = ({ language, catalogs }) => {
  const [locale, setLocale] = useState('pt-br');

  useEffect(() => {
    if (language !== null) {
      loadCatalog(language).then();
    }
  }, [language]);

  const I18nBoilerplateProvider = provideI18nLanguageContext({
    locale,
    setLocale: a => loadCatalog(a),
  })(Fragment);

  const loadCatalog = async newLanguage => {
    const catalog = await (typeof catalogs[newLanguage] === 'function'
      ? catalogs[newLanguage]()
      : catalogs[newLanguage]);

    i18n.load({
      [newLanguage]: catalog,
    });
    i18n.activate(newLanguage);
    setLocale(newLanguage);
  };

  return { I18nBoilerplateProvider, locale };
};
