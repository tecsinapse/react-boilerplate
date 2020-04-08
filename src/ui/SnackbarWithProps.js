import React from 'react';
import {Snackbar} from '@tecsinapse/ui-kit/build/Snackbar/Snackbar';

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
