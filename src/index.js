import localforage from 'localforage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

import { isRunningStandalone } from './offline/offlineUtils';
import { GlobalAfterInitObjects } from './GlobalAfterInitUtils';
import { bootstrapKC } from './keycloak/Keycloak';
import { initHotjar } from './initHotjar';

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
 * @param  {string} props.ignoreScope default offline_access
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

export const init = async ({
  hotjarId,
  analyticsCode = null,
  reduxOptions: { appState = null, middlewares = [] } = {},
  apolloOptions: {
    offlineApolloCacheOptions = null,
    uri,
    connectToDevTools,
  } = {},
  axiosOptions: { axiosBaseUri, interceptors } = {},
  keycloakOptions: { keycloakConfig, logoutFunction, publicUrls = [] } = {},
  sentryOptions,
  idpHint,
  ignoreScope = false,
  renderFunction,
}) => {
  const keycloak = Keycloak(keycloakConfig);

  bootstrapKC(keycloak);

  if (analyticsCode) {
    ReactGA.initialize(analyticsCode);
  }

  if (hotjarId) {
    initHotjar(hotjarId);
  }

  if (sentryOptions) {
    Sentry.init(sentryOptions);
  }

  let store = null;

  if (appState) {
    const { createStore, applyMiddleware, compose } = await import('redux');
    const composeEnhancer =
      (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;

    store = createStore(
      appState,
      composeEnhancer(applyMiddleware(...middlewares))
    );
  }

  const cache = new InMemoryCache({});

  let defaultOptions = {};

  // offline cache config options
  if (offlineApolloCacheOptions) {
    const { maxSize = 1048576 * 20 } = offlineApolloCacheOptions;
    const { persistCache } = await import('apollo-cache-persist');

    persistCache({
      cache,
      storage: localforage,
      maxSize,
    });
    defaultOptions = {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true, // needed for networkStatus
      },
    };
  }
  const refreshKeycloakToken = (minValidity = 5) =>
    new Promise((resolve, reject) => {
      if (navigator.onLine || !isRunningStandalone()) {
        keycloak
          .updateToken(minValidity)
          .then(() => {
            localforage.setItem('token', keycloak.token);
            localforage.setItem('refreshToken', keycloak.refreshToken);
            resolve();
          })
          .catch(error => reject(error));
      } else {
        resolve();
      }
    });

  const authMiddleware = setContext((operation, { headers }) =>
    refreshKeycloakToken()
      .then(() => ({
        headers: {
          ...headers,
          authorization: `Bearer ${keycloak.token}`,
        },
      }))
      .catch(() => {
        keycloak.login({ prompt: 'none' });
      })
  );

  if (axiosBaseUri) {
    axios.defaults.baseURL = axiosBaseUri;
  }

  axios.interceptors.request.use(config =>
    refreshKeycloakToken()
      .then(() => {
        const newConfig = config;

        newConfig.headers.Authorization = `Bearer ${keycloak.token}`;

        return Promise.resolve(newConfig);
      })
      .catch(() => {
        keycloak.login({ prompt: 'none' });
      })
  );

  if (interceptors) {
    const { request, response } = interceptors;

    if (request) {
      request.forEach(([success, error]) =>
        axios.interceptors.request.use(
          success || (() => {}),
          error || (() => {})
        )
      );
    }

    if (response) {
      response.forEach(([success, error]) =>
        axios.interceptors.response.use(
          success || (() => {}),
          error || (() => {})
        )
      );
    }
  }

  const httpLink = new HttpLink({ uri });

  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, httpLink]),
    cache,
    connectToDevTools,
    defaultOptions,
  });

  // KEYCLOAK LOGIN
  localforage
    .ready()
    .then(() =>
      Promise.all([
        localforage.getItem('token'),
        localforage.getItem('refreshToken'),
      ])
    )
    .then(([token, refreshToken]) => {
      const initOptions = {
        checkLoginIframe: false,
      };

      // only set token for standalone pwa
      if (isRunningStandalone()) {
        if (token !== null) {
          initOptions.token = token;
        }

        if (refreshToken !== null) {
          initOptions.refreshToken = refreshToken;
        }
      }

      const afterKcInit = authenticated => {
        if (!authenticated && navigator.onLine) {
          const options =
            isRunningStandalone() && !ignoreScope
              ? {
                  scope: 'offline_access',
                  idpHint,
                }
              : undefined;

          if (
            !publicUrls.some(publicUrl =>
              window.location.pathname.startsWith(publicUrl)
            )
          ) {
            keycloak.login(options);
          } else {
            renderFunction({
              isPublicRoute: true,
              keycloak,
              client,
              store,
            });
          }
        } else {
          localforage.setItem('token', keycloak.token);
          localforage.setItem('refreshToken', keycloak.refreshToken);
          keycloak.loadUserProfile().then(() => {
            renderFunction({
              keycloak,
              client,
              store,
            });
          });
        }
      };

      keycloak
        .init(initOptions)
        .then(afterKcInit)
        .catch(() => {
          if (!navigator.onLine) {
            afterKcInit(false);
          } else {
            logoutFunction(keycloak, client);
          }
        });
    });

  GlobalAfterInitObjects.apolloClient = client;
  GlobalAfterInitObjects.keycloak = keycloak;
  GlobalAfterInitObjects.reduxStore = store;

  return {
    keycloak,
    client,
    store,
  };
};

export { i18n } from './i18n/i18n';
export { withI18nLanguage } from './i18n/withI18nLanguage';
export { showGlobalLoading, hideGlobalLoading } from './ui/globalLoading';
export { ChildProviders } from './ChildProviders';
export { Providers } from './Providers';
export { withKeycloak } from './keycloak/withKeycloak';
export { withSnackbarContext } from './ui/withSnackbarContext';
