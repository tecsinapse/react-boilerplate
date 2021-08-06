import { Context } from 'react';

export type SnackbarParameters = {
  variant: 'success' | 'warning' | 'error' | 'info';
  text: string;
  autoHide?: number;
};

export type SnackbarProps = (args: SnackbarParameters) => void;

declare const SnackbarProviderContext: Context<SnackbarProps>;

export { SnackbarProviderContext };
export default SnackbarProviderContext;
