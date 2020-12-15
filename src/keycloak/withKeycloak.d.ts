import { FC, ReactNode } from 'react';

export interface withKeycloakProps {
  Component: ReactNode;
}

declare const withKeycloak: FC<withKeycloakProps>;

export { withKeycloak };
export default withKeycloak;
