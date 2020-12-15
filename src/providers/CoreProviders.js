import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { provideKeycloakContext } from '../keycloak/provideKeycloakContext';

export const CoreProviders = ({ keycloak, client, store, children }) => {
  const ReduxProvider = store == null ? Fragment : Provider;
  const KeycloakProvider = provideKeycloakContext(keycloak)(Fragment);

  return (
    <ReduxProvider {...(store == null ? {} : { store })}>
      <ApolloProvider client={client}>
        <KeycloakProvider>{children}</KeycloakProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default CoreProviders;
