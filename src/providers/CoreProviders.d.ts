import { FC, ReactNode } from 'react';

export interface CoreProvidersProps {
  keycloak: object;
  client: object;
  store?: object;
  children: ReactNode | ReactNode[];
}

declare const CoreProviders: FC<CoreProvidersProps>;

export { CoreProviders };
export default CoreProviders;
