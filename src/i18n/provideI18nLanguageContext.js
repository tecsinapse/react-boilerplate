import { withContext } from 'recompose';
import PropTypes from 'prop-types';

export const provideI18nLanguageContext = ({ locale, setLocale }) => Component =>
  withContext(
    {
      changeLanguage: PropTypes.func,
      currentLocale: PropTypes.string,
    },
    () => ({
      currentLocale: locale,
      changeLanguage: setLocale,
    })
  )(Component);
