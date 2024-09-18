import { withApollo } from '@apollo/client/react/hoc';
import localforage from 'localforage';
import PropTypes from 'prop-types';
import { compose, withContext } from 'recompose';

export const logout = (keycloak, client) => {
  client
    .clearStore()
    .then(() => localforage.clear())
    .then(() => {
      localStorage.clear();
      keycloak.logout({ redirectUri: window.location.origin });
    });
};

export const provideKeycloakContext = keycloak => Component =>
  compose(
    withApollo,
    withContext(
      {
        keycloak: PropTypes.object,
        logout: PropTypes.func,
      },
      ({ client }) => ({
        keycloak,
        logout: () => logout(keycloak, client),
      })
    )
  )(Component);

export default provideKeycloakContext;
