import {getContext} from 'recompose';
import PropTypes from 'prop-types';

/**
 * @function withKeycloak
 *
 * @description Composes keycloack auth manager
 *
 * @param {Element} Component - Receives a react component
 *
 * @returns {Function} Returns a context
 *
 */
export const withKeycloak = Component =>
  getContext({
	keycloak: PropTypes.object,
	logout: PropTypes.func,
  })(Component);
