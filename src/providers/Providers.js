import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { KeycloakContext } from '../keycloak';
import { logout } from '../keycloak/provideKeycloakContext';
import { appHistory } from '../router/history';
import { SnackbarProvider } from '../ui';

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
  themeVariant = 'orange',
  themeOverrides = {},
}) => {
  const ReduxProvider = store == null ? Fragment : Provider;

  return (
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <KeycloakContext.Provider
          value={{
            keycloakCtx: keycloak,
            logoutCtx: () => logout(keycloak, client),
          }}
        >
          <ThemeProvider variant={themeVariant} overrides={themeOverrides}>
            <SnackbarProvider>
              <Router history={appHistory}>{children}</Router>
            </SnackbarProvider>
          </ThemeProvider>
        </KeycloakContext.Provider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default Providers;
