import { withContext } from 'recompose';
import PropTypes from 'prop-types';

export const withKeycloakContext = keycloak =>
  withContext(
    {
      keycloak: PropTypes.object,
    },
    () => ({
      keycloak,
    })
  );
