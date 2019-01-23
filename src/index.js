import localforage from 'localforage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { Keycloak } from './Keycloak';
import { isRunningStandalone } from './offline/offlineUtils';
import { GlobalAfterInitObjects } from './GlobalAfterInitUtils';

export const init = async ({
  analyticsCode = null,
  ravenCode = null,
  reduxOptions: { appState = null } = {},
  apolloOptions: { offlineApolloCacheOptions = null, uri } = {},
  keycloakOptions: { keycloakConfig, logoutFunction } = {},
  renderFunction,
}) => {
  const keycloak = Keycloak(keycloakConfig);
  if (analyticsCode) {
    const ReactGA = await import('react-ga');
    ReactGA.initialize(analyticsCode);
  }
  if (ravenCode) {
    const Raven = await import('raven-js');
    Raven.config(ravenCode).install();
  }

  let store = null;
  if (appState) {
    const { createStore } = await import('redux');
    store = createStore(
      appState,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  const cache = new InMemoryCache({});

  let defaultOptions = {};

  /** *********
   * offline cache config options
   ************ */
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

  const authMiddleware = setContext((operation, { headers }) =>
    keycloak
      .refreshKeycloakToken()
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

  const httpLink = new HttpLink({ uri });

  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, httpLink]),
    cache,
    connectToDevTools: true,
    defaultOptions,
  });

  /** ********
   * KEYCLOAK LOGIN
   *********** */
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
          const options = isRunningStandalone()
            ? {
                scope: 'offline_access',
              }
            : undefined;
          keycloak.login(options);
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
        .success(afterKcInit)
        .error(() => {
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
