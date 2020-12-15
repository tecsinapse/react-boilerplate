import React from 'react';
import { I18nProvider } from '@lingui/react';
import { Router } from 'react-router';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { i18n } from '../i18n/i18n';
import { appHistory } from '../router/history';
import { useLocale } from '../hooks/useLocale';

export const ChildProviders = ({
  children,
  catalogs = {},
  themeVariant = 'orange',
  language = null,
}) => {
  const { locale, I18nBoilerplateProvider } = useLocale({ language, catalogs });

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

export default ChildProviders;
