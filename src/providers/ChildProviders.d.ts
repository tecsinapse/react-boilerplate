import { FC, ReactNode } from 'react';

export interface ChildProvidersProps {
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
}

declare const ChildProviders: FC<ChildProvidersProps>;

export { ChildProviders };
export default ChildProviders;
