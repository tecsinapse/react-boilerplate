import FullscreenLoading from '@tecsinapse/ui-kit/build/Loading/FullscreenLoading';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @function showGlobalLoading
 * @description This method render a loading circle at screen
 */
export const showGlobalLoading = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('fullscreenloading'));
  ReactDOM.render(
    <FullscreenLoading show />,
    document.getElementById('fullscreenloading')
  );
};
/**
 * @function hideGlobalLoading
 * @description This method hides the loading circle at screen
 */
export const hideGlobalLoading = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('fullscreenloading'));
};
