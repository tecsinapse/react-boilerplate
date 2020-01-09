import {setupI18n} from '@lingui/core';

/**
 * @function i18n
 *
 * @description Provides support for internationalization
 *
 * @returns {Function} Returns i18n ready for use (check https://www.npmjs.com/package/i18n)
 *
 * @example
 * import { i18n } from '@tecsinapse/react-boilerplate/build/i18n/i18n';
 * import { Button } from '@tecsinapse/ui-kit';
 *
 * export const ConfirmButton = <Button label={i18n._(t`Confirmar`)} />;
 *
 */
export const i18n = setupI18n();
export default i18n;
