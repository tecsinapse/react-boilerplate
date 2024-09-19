import React from 'react';

export const I18nContext = React.createContext({
  currentLocaleCtx: {},
  changeLanguageCtx: () => {},
});

export default I18nContext;
