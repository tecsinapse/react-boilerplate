export interface UseKeycloakProps {
  keycloak: any;
  logout: () => void;
}

declare const useKeycloak: () => UseKeycloakProps;

export { useKeycloak };
export default useKeycloak;
