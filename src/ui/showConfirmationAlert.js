import { confirmable, createConfirmation } from 'react-confirm';
import { ConfirmationAlert } from '@tecsinapse/ui-kit/build/Alerts/ConfirmationAlert';
import React from 'react';

export const showConfirmationAlert = createConfirmation(
  confirmable(ConfirmationAlert)
);
