import React, { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Router } from 'react-router';
import { I18nProvider } from '@lingui/react';
import { appHistory } from './router/history';
import { provideKeycloakContext } from './keycloak/provideKeycloakContext';
import { provideI18nLanguageContext } from './i18n/provideI18nLanguageContext';

export const Providers = ({
  keycloak,
  client,
  store,
  children,
  themeVariant = 'orange',
  catalogs = {},
}) => {
  const [locale, setLocale] = useState('pt-br');
  const [iCatalogs, setICatalogs] = useState({});
  useEffect(
    async () => {
      await loadCatalog(locale);
    },
    [locale]
  );

  const ReduxProvider = store == null ? Fragment : Provider;
  const KeycloakProvider = provideKeycloakContext(keycloak)(Fragment);
  const I18nBoilerplateProvider = provideI18nLanguageContext({
    locale,
    setLocale,
  })(Fragment);
  const loadCatalog = async newLanguage => {
    const catalog = await catalogs[newLanguage];
    setICatalogs(oldCatalogs => ({
      catalogs: {
        ...oldCatalogs,
        [newLanguage]: catalog,
      },
    }));
  };

  return (
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <ThemeProvider variant={themeVariant}>
          <KeycloakProvider>
            <I18nBoilerplateProvider>
              <I18nProvider language={locale} catalogs={iCatalogs}>
                <Router history={appHistory}>{children}</Router>
              </I18nProvider>
            </I18nBoilerplateProvider>
          </KeycloakProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};
