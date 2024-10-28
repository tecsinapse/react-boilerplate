import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import React from 'react';
import { Router } from 'react-router';
import { useLocale } from '../hooks/useLocale';
import { i18n } from '../i18n/i18n';
import { appHistory } from '../router/history';

export const ChildProviders = ({
  children,
  catalogs = {},
  themeVariant = 'orange',
  language = null,
}) => {
  const { I18nBoilerplateProvider } = useLocale({ language, catalogs });

  return (
    <I18nBoilerplateProvider>
      <I18nProvider i18n={i18n}>
        <ThemeProvider variant={themeVariant}>
          <Router history={appHistory}>{children}</Router>
        </ThemeProvider>
      </I18nProvider>
    </I18nBoilerplateProvider>
  );
};

export default ChildProviders;
