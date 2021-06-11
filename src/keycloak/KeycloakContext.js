import React from 'react';

export const KeycloakContext = React.createContext({
  keycloakCtx: {},
  logoutCtx: () => {},
});

export default KeycloakContext;
