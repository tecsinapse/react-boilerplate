import { getContext } from 'recompose';
import PropTypes from 'prop-types';

export const withKeycloak = Component =>
  getContext({
	keycloak: PropTypes.object,
	logout: PropTypes.func,
  })(Component);
