import kc from 'keycloak-js';
import localforage from 'localforage';
import Raven from 'raven-js';
import { isRunningStandalone } from './offline/offlineUtils';

const oldLoadUserProfile = kc.loadUserProfile;
kc.loadUserProfile = async function getUserProfile() {
  const profile = await localforage.getItem('userProfile');
  if (profile == null) {
    await oldLoadUserProfile();
    await localforage.setItem('userProfile', kc.profile);
  } else {
    kc.profile = profile;
  }
  Raven.setUserContext({
    email: kc.profile.email,
  });
  return kc.profile;
};

kc.refreshKeycloakToken = (minValidity = 5) =>
  new Promise((resolve, reject) => {
    if (navigator.onLine || !isRunningStandalone()) {
      kc.updateToken(minValidity)
        .success(() => {
          localforage.setItem('token', kc.token);
          localforage.setItem('refreshToken', kc.refreshToken);
          resolve();
        })
        .error(error => reject(error));
    } else {
      resolve();
    }
  });

export { kc as Keycloak };
