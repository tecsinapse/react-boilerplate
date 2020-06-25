import React, { Fragment, useEffect, useState } from 'react';
import { I18nProvider } from '@lingui/react';
import { Router } from 'react-router';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { provideI18nLanguageContext } from './i18n/provideI18nLanguageContext';
import { i18n } from './i18n/i18n';
import { appHistory } from './router/history';

export const ChildProviders = ({
  children,
  catalogs = {},
  themeVariant = 'orange',
  language = null,
}) => {
  const [locale, setLocale] = useState('pt-br');

  useEffect(() => {
    if (language !== null) {
      loadCatalog(language);
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

  return (
    <I18nBoilerplateProvider>
      <I18nProvider language={locale} i18n={i18n}>
        <ThemeProvider variant={themeVariant}>
          <Router history={appHistory}>{children}</Router>
        </ThemeProvider>
      </I18nProvider>
    </I18nBoilerplateProvider>
  );
};
