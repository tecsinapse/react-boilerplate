import React, { createContext, Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Router } from 'react-router';
import { provideKeycloakContext } from './keycloak/provideKeycloakContext';
import { provideI18nLanguageContext } from './i18n/provideI18nLanguageContext';
import { i18n } from './i18n/i18n';
import { appHistory } from './router/history';
import { SnackbarProvider } from './ui/SnackbarProvider';

export const SnackbarProviderContext = createContext(null);

export const Providers = ({
  keycloak,
  client,
  store,
  children,
  catalogs = {},
  themeVariant = 'orange',
  language = null,
}) => {
  const ReduxProvider = store == null ? Fragment : Provider;
  const KeycloakProvider = provideKeycloakContext(keycloak)(Fragment);
  const [locale, setLocale] = useState('pt-br');

  useEffect(
    () => {
      if (language !== null) {
        loadCatalog(language);
      }
    },
    [language]
  );
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
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <KeycloakProvider>
          <I18nBoilerplateProvider>
            <I18nProvider language={locale} i18n={i18n}>
              <ThemeProvider variant={themeVariant}>
                <SnackbarProvider>
                  <Fragment>
                    <Router history={appHistory} />
                  </Fragment>
                </SnackbarProvider>
              </ThemeProvider>
            </I18nProvider>
          </I18nBoilerplateProvider>
        </KeycloakProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};
