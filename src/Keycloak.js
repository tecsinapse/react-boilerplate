import kc from 'keycloak-js';
import localforage from 'localforage';
import Raven from 'raven-js';
import { isRunningStandalone } from './offline/offlineUtils';

const oldLoadUserProfile = kc.loadUserProfile;
kc.loadUserProfile = async function getUserProfile() {
  const profile = await localforage.getItem('userProfile');
  if (navigator.onLine) {
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

export { kc as Keycloak };
