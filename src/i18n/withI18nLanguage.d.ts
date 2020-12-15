import { FC, ReactNode } from 'react';

export interface withI18nLanguageProps {
  Component: ReactNode;
}

declare const withI18nLanguage: FC<withI18nLanguageProps>;

export { withI18nLanguage };
export default withI18nLanguage;
