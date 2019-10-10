import React from 'react';
import { Snackbar } from '@tecsinapse/ui-kit/build/Snackbar/Snackbar';

export const SnackbarWithProps = ({ show, dismiss, variant, text }) => (
  <Snackbar show={show} variant={variant} onClose={dismiss}>
    {text}
  </Snackbar>
);
