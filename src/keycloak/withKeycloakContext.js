import { withContext } from 'recompose';
import PropTypes from 'prop-types';

export const withKeycloakContext = keycloak => Component =>
  withContext(
    {
      keycloak: PropTypes.object,
    },
    () => ({
      keycloak,
    })
  )(Component);
