import { confirmable, createConfirmation } from 'react-confirm';
import { ConfirmationAlert } from '@tecsinapse/ui-kit/build/Alerts/ConfirmationAlert';
import React from 'react';
import { ThemeProvider } from '@tecsinapse/ui-kit';

const DialogConfirmable = props => (
  <ThemeProvider variant="orange">
    <ConfirmationAlert {...props} />
  </ThemeProvider>
);

export const showConfirmationAlert = createConfirmation(
  confirmable(DialogConfirmable)
);
