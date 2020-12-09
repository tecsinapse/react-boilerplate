import React, { useState } from 'react';
import { SnackbarWithProps } from './SnackbarWithProps';

import { SnackbarProviderContext } from '../context/SnackbarProviderContext';

export const SnackbarProvider = ({ children }) => {
  const [snack, setShowSnackbar] = useState({
    show: false,
    variant: 'success',
  });
  const showSnackbar = ({ variant, text, autoHide }) => {
    setShowSnackbar({ show: true, variant, text, autoHide });
  };

  return (
    <SnackbarProviderContext.Provider value={showSnackbar}>
      <div>
        <SnackbarWithProps
          dismiss={() => setShowSnackbar(obj => ({ ...obj, show: false }))}
          {...snack}
        />
      </div>
      {children}
    </SnackbarProviderContext.Provider>
  );
};
