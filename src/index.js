import ReactGA from 'react-ga';
import localforage from 'localforage';
import Raven from 'raven-js';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { Keycloak } from './Keycloak';
import { isRunningStandalone } from './offline/offlineUtils';

export const init = ({
  analyticsCode,
  ravenCode,
  appState,
  apolloOptions: { offlineApolloCacheOptions = null, uri },
  keycloakOptions: { keycloakConfig, logoutFunction },
  renderFunction,
}) => {
  const keycloak = Keycloak(keycloakConfig);
  ReactGA.initialize(analyticsCode);
  Raven.config(ravenCode).install();

  const cache = new InMemoryCache({});

  let defaultOptions = {};

  /** *********
   * offline cache config options
   ************ */
  if (offlineApolloCacheOptions) {
    const { maxSize = 1048576 * 20 } = offlineApolloCacheOptions;
    import('apollo-cache-persist').then(({ persistCache }) => {
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
    });
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

      if (token !== null) {
        initOptions.token = token;
      }

      if (refreshToken !== null) {
        initOptions.refreshToken = refreshToken;
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
            renderFunction();
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
  return {
    keycloak,
    client,
  };
};
