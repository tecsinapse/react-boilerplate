import {confirmable, createConfirmation} from 'react-confirm';
import {ConfirmationAlert} from '@tecsinapse/ui-kit/build/Alerts/ConfirmationAlert';
import React from 'react';
import ThemeProvider from '@tecsinapse/ui-kit/build/ThemeProvider';

const DialogConfirmable = ({ variant, ...props }) => (
  <ThemeProvider variant={variant}>
    <ConfirmationAlert {...props} />
  </ThemeProvider>
);

export const showConfirmationAlert = createConfirmation(
  confirmable(DialogConfirmable)
);
