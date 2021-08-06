/**
 * @function init
 * @description This method initializes your react app, useful to replace defaults on index
 *
 * @param {object} props - Object containing all parameters to initialize the application for web
 * @param {string} props.hotjarId - Hotjar code for your app
 * @param {string} props.analyticsCode - Google analytics code for tracking (default = null)
 * @param {object} props.reduxOptions - Initial redux options (default = {})
 * @param {object} props.reduxOptions.appState - Initial app state (default = null)
 * @param {object} props.axiosOptions - Initial axios config (default = {})
 * @param {object} props.apolloOptions - Initial apollo config (default = {})
 * @param {object} props.apolloOptions.offlineApolloCacheOptions - Initial apollo cache config (default = null)
 * @param {object} props.keycloakOptions - Initial KC config (default = {})
 * @param {object} props.keycloakOptions.publicUrls - Initial public URL's (default = [])
 * @param {object} props.sentryOptions - Initial sentry tracker config
 * @param {string} props.idpHint - idpHint for kc login
 * @param {Function} props.renderFunction - Render function
 *
 * @example
 * init({
 *  analyticsCode: "AAAA",
 *  hotjarId: "BBBB",
 *  sentryOptions: {
 *    dsn: 'https://sentry.io/',
 *    release: process.env.REACT_APP_VERSION,
 *    environment: process.env.REACT_APP_HOST,
 *  },
 *  reduxOptions: {
 *    appState: store,
 *    middlewares: [middlewares],
 *  }
 *  axiosOptions: {
 *    axiosBaseUri: `http://localhost`,
 *    interceptors:{
 *       request: [ [successInterceptor1, errorInterceptor1], [successInterceptor2, errorInterceptor2] ],
 *       response: [ [successInterceptor3, errorInterceptor3], [successInterceptor4, errorInterceptor4] ],
 *    }
 *  },
 *  apolloOptions: {
 *    offlineApolloCacheOptions: null,
 *    uri: `http://localhost/api`,
 *    connectToDevTools: true,
 *    extraHeaders: {},
 *  },
 *  keycloakOptions: {
 *    keycloakConfig: {},
 *    logoutFunction: () => {},
 *    publicUrls: ['/login'],
 *  },
 *  renderFunction: props => {
 *    ReactDOM.render(
 *      <Providers />,
 *      document.getElementById('root')
 *    );
 *  }
 * });
 */

export type InitReturnProps = {
  keycloak: object;
  client: object;
  store: object;
  isPublicRoute: boolean;
};

export type KeycloakConfig = {
  url: string;
  realm: string;
  clientId: string;
};

export interface InitProps {
  hotjarId?: string;
  analyticsCode?: string;
  reduxOptions?: { appState?: object; middlewares?: unknown };
  apolloOptions?: {
    offlineApolloCacheOptions?: object;
    uri: string;
    connectToDevTools?: boolean;
    extraHeaders?: object;
  };
  axiosOptions?: { axiosBaseUri: string; interceptors?: object };
  keycloakOptions: {
    keycloakConfig: KeycloakConfig;
    logoutFunction?: (
      props: Omit<InitReturnProps, 'isPublicRoute' | 'store'>
    ) => void;
    publicUrls: string[];
    ignoreStandaloneLoginFlow?: boolean;
  };
  sentryOptions?: object;
  idpHint?: string;
  renderFunction: (props: InitReturnProps) => void;
}

declare function init(props: InitProps): void;

export { Providers, ChildProviders } from './providers';

export { i18n, withI18nLanguage } from './i18n';

export { withKeycloak, useKeycloak, KeycloakContext } from './keycloak';

export { SnackbarProviderContext } from './context';

export {
  hideGlobalLoading,
  showGlobalLoading,
  withSnackbarContext,
} from './ui';

export { init };
export default init;
