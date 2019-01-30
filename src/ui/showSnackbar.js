import { confirmable, createConfirmation } from 'react-confirm';
import { Snackbar } from '@tecsinapse/ui-kit';
import React from 'react';

const SnackbarConfirmable = ({ show, proceed, dismiss, cancel, variant }) => (
  <Snackbar show={show} variant={variant} onClose={dismiss} />
);

const SnackbarConfirmableDialog = confirmable(SnackbarConfirmable);
export const showSnackbar = createConfirmation(SnackbarConfirmableDialog);
