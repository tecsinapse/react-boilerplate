import FullscreenLoading from '@tecsinapse/ui-kit/build/Loading/FullscreenLoading';
import React from 'react';
import ReactDOM from 'react-dom';

export const showGlobalLoading = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('fullscreenloading'));
  ReactDOM.render(
    <FullscreenLoading show />,
    document.getElementById('fullscreenloading')
  );
};
export const hideGlobalLoading = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('fullscreenloading'));
};
