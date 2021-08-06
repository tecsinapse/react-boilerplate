import { createContext } from 'react';

export const SnackbarProviderContext = createContext({
  show: false,
  variant: 'success',
});

export default SnackbarProviderContext;
