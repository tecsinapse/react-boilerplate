import React, { useState } from 'react';
import { SnackbarWithProps } from './SnackbarWithProps';

import { SnackbarProviderContext } from '../Providers';

export const SnackbarProvider = ({ children }) => {
  const [snack, setShowSnackbar] = useState({
    show: false,
    variant: 'success',
  });
  const showSnackbar = ({ variant, text }) => {
    setShowSnackbar({ show: true, variant, text });
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
