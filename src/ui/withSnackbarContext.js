import React from 'react';
import { SnackbarProviderContext } from '../context/SnackbarProviderContext';

/**
 * @function withSnackbarContext
 *
 * @description Composes wrapper to use snackbar alerts
 *
 * @param {Element} Component - Receives a react component
 *
 * @returns {Function} Returns a context
 *
 */
export function withSnackbarContext(Component) {
  return function WrapperComponent(props) {
    return (
      <SnackbarProviderContext.Consumer>
        {showSnackbar => <Component {...props} showSnackbar={showSnackbar} />}
      </SnackbarProviderContext.Consumer>
    );
  };
}
