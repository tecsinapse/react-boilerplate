import { getContext } from 'recompose';
import PropTypes from 'prop-types';

export const GetKeycloakContext = Component =>
  getContext({
    keycloak: PropTypes.object,
  })(Component);
