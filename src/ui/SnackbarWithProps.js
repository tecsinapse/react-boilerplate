import React from 'react';
import { Snackbar } from '@tecsinapse/ui-kit';

export const SnackbarWithProps = ({
  show,
  dismiss,
  variant,
  text,
  autoHide,
}) => (
  <Snackbar
    show={show}
    variant={variant}
    onClose={dismiss}
    autoHideDuration={autoHide}
  >
    {text}
  </Snackbar>
);
