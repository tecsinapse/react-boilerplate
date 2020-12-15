import { withContext, compose } from 'recompose';
import PropTypes from 'prop-types';
import localforage from 'localforage';
import { withApollo } from '@apollo/react-hoc';

const logout = (keycloak, client) => {
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
