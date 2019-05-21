/* eslint no-console: 0 */
import * as Sentry from '@sentry/browser';

export const Logger = {
  error(error) {
    console.log(error);
    Sentry.captureException(new Error(error));
  },
};
