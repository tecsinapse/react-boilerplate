/* eslint-disable */
import localforage from 'localforage';
import * as Sentry from '@sentry/browser';

function bootstrapKC(kc) {
  const oldLoadUserProfile = kc.loadUserProfile;
  kc.loadUserProfile = async function getUserProfile() {
    const profile = await localforage.getItem('userProfile');
    if (navigator.onLine) {
      await oldLoadUserProfile();
      await localforage.setItem('userProfile', kc.profile);
    } else {
      kc.profile = profile;
    }
    Sentry.configureScope(scope => {
      scope.setUser({ email: kc.profile.email });
    });
    return kc.profile;
  };
  return kc;
}
export { bootstrapKC };
