import { FC, ReactNode } from 'react';

export interface withSnackbarContextProps {
  Component: ReactNode;
}

declare const withSnackbarContext: FC<withSnackbarContextProps>;

export { withSnackbarContext };
export default withSnackbarContext;
