import React, { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { I18nProvider } from '@lingui/react';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Router } from 'react-router';
import { provideKeycloakContext } from './keycloak/provideKeycloakContext';
import { provideI18nLanguageContext } from './i18n/provideI18nLanguageContext';
import { i18n } from './i18n/i18n';
import { appHistory } from './router/history';
import { SnackbarProvider } from './ui/SnackbarProvider';

/**
 * Providers
 *
 * @description This element provides all resources to children components
 *
 * @param {object} props - Object containing all parameters to JSX component
 * @param {object} props.keycloak - Keycloack config
 * @param {object} props.client - Apollo client config
 * @param {object} props.store - Redux store provider
 * @param {object} props.children - Children element to render
 * @param {object} props.catalogs - Object containing list of i18n languages available
 * @param {string} props.themeVariant - UI-KIT theme variant
 * @param {string | null} props.language - Language being loaded on runtime
 * @param {object} props.themeOverrides - Object containing material-ui theme overrides
 *
 * @returns {JSX.Element} React element
 *
 * @example
 * <Providers
 *  themeVariant="orange"
 *  catalogs={{
 *    'pt-br': () => import(`./locales/pt-br/messages`),
 *    en: () => import(`./locales/en/messages`)
 *  }}
 *  themeOverrides={{
 *    MuiBadge: {
 *      badge: {
 *        backgroundColor: #FFF,
 *      }
 *    }
 *  }}
 *  {...props}
 * >
 *  <App />
 * </Providers>
 */

export const Providers = ({
  keycloak,
  client,
  store,
  children,
  catalogs = {},
  themeVariant = 'orange',
  language = null,
  themeOverrides = {},
}) => {
  const ReduxProvider = store == null ? Fragment : Provider;
  const KeycloakProvider = provideKeycloakContext(keycloak)(Fragment);
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

  return (
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <KeycloakProvider>
          <I18nBoilerplateProvider>
            <I18nProvider language={locale} i18n={i18n}>
              <ThemeProvider variant={themeVariant} overrides={themeOverrides}>
                <SnackbarProvider>
                  <Router history={appHistory}>{children}</Router>
                </SnackbarProvider>
              </ThemeProvider>
            </I18nProvider>
          </I18nBoilerplateProvider>
        </KeycloakProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};
