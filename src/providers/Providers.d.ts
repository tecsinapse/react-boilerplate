import { FC, ReactNode } from 'react';

export interface ProvidersProps {
  keycloak: object;
  client: object;
  store?: object;
  children: ReactNode | ReactNode[];
  catalogs?: object;
  themeVariant?:
    | 'orange'
    | 'yellow'
    | 'blueGrey'
    | 'black'
    | 'redLight'
    | 'green'
    | 'deepBlack'
    | 'blackOrange'
    | 'blueLight'
    | 'deepBlue'
    | 'micBlue'
    | 'greyLight'
    | 'lightOrange'
    | 'blueOcean'
    | 'shallowBlue'
    | 'wingo';
  language?: string | null;
  themeOverrides?: object;
}

declare const Providers: FC<ProvidersProps>;

export { Providers };
export default Providers;
