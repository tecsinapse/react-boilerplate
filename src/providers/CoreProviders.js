import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  logout,
  provideKeycloakContext,
} from '../keycloak/provideKeycloakContext';
import { KeycloakContext } from '../keycloak/KeycloakContext';

export const CoreProviders = ({ keycloak, client, store, children }) => {
  const ReduxProvider = store == null ? Fragment : Provider;
  const KeycloakProvider = provideKeycloakContext(keycloak)(Fragment);

  return (
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <KeycloakContext.Provider
          value={{
            keycloakCtx: keycloak,
            logoutCtx: () => logout(keycloak, client),
          }}
        >
          <KeycloakProvider>{children}</KeycloakProvider>
        </KeycloakContext.Provider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default CoreProviders;
