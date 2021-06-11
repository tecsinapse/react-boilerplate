import { Context } from 'react';

export interface KeycloakContextProps {
  keycloakCtx: any;
  logoutCtx: () => void;
}

declare const KeycloakContext: Context<KeycloakContextProps>;

export { KeycloakContext };
export default KeycloakContext;
