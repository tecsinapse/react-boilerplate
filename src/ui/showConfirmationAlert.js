import React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';
import { ConfirmationAlert, ThemeProvider } from '@tecsinapse/ui-kit';

const DialogConfirmable = ({ variant, ...props }) => (
  <ThemeProvider variant={variant}>
    <ConfirmationAlert {...props} />
  </ThemeProvider>
);

export const showConfirmationAlert = createConfirmation(
  confirmable(DialogConfirmable)
);
