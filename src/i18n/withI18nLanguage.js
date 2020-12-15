import { getContext } from 'recompose';
import PropTypes from 'prop-types';

/**
 * @function withI18nLanguage
 *
 * @description Composes support for multiple i18n languages
 *
 * @param {Element} Component - Receives a react component
 *
 * @returns {Function} Returns a context
 *
 * @example
 *
 */
export const withI18nLanguage = Component =>
  getContext({
    changeLanguage: PropTypes.func,
    currentLocale: PropTypes.string,
  })(Component);

export default withI18nLanguage;
