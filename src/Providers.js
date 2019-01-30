import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Router } from 'react-router';
import { appHistory } from './router/history';
import { withKeycloakContext } from './keycloak/withKeycloakContext';

export const Providers = ({ keycloak, client, store, children }) => {
  const ReduxProvider = store == null ? Fragment : Provider;
  const KeycloakProvider = withKeycloakContext(keycloak)(Fragment);
  return (
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <ThemeProvider variant="orange">
          <KeycloakProvider>
            <Router history={appHistory}>{children}</Router>
          </KeycloakProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};
