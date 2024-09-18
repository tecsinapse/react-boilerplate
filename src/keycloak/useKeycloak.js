import { useContext } from 'react';
import { KeycloakContext } from './KeycloakContext';

export const useKeycloak = () => {
  const { keycloakCtx, logoutCtx } = useContext(KeycloakContext);

  return { keycloak: keycloakCtx, logout: logoutCtx };
};

export default useKeycloak;
