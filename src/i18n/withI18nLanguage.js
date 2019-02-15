import { getContext } from 'recompose';
import PropTypes from 'prop-types';

export const withI18nLanguage = Component =>
  getContext({
    changeLanguage: PropTypes.function,
    currentLocale: PropTypes.string,
  })(Component);
