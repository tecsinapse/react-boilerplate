import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@tecsinapse/ui-kit';
import { Router } from 'react-router';
import { appHistory } from './router/history';

export const Providers = ({ keycloak, client, store, children }) => {
  const ReduxProvider = store == null ? Fragment : Provider;
  return (
    <ReduxProvider store={store || undefined}>
      <ApolloProvider client={client}>
        <ThemeProvider variant="orange">
          <Router history={appHistory}>{children}</Router>
        </ThemeProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};
