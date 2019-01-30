import { withContext } from 'recompose';
import PropTypes from 'prop-types';

export const provideKeycloakContext = keycloak => Component =>
  withContext(
    {
      keycloak: PropTypes.object,
    },
    () => ({
      keycloak,
    })
  )(Component);
