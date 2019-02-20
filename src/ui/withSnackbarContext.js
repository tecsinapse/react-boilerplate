import React from 'react';
import { SnackbarProviderContext } from '../Providers';

export function withSnackbarContext(Component) {
  return function WrapperComponent(props) {
    return (
      <SnackbarProviderContext.Consumer>
        {showSnackbar => <Component {...props} showSnackbar={showSnackbar} />}
      </SnackbarProviderContext.Consumer>
    );
  };
}
