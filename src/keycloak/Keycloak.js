/* eslint-disable */
import localforage from 'localforage';
import * as Sentry from '@sentry/browser';

function bootstrapKC(kc) {
  const oldLoadUserProfile = kc.loadUserProfile;
  kc.loadUserProfile = async function getUserProfile() {
    const profile = await localforage.getItem('userProfile');
    if (navigator.onLine) {
      const response = await oldLoadUserProfile();
      await response.success(profile =>
        localforage.setItem('userProfile', profile)
      );
    } else {
      kc.profile = profile;
    }
    return kc.profile;
  };
  Sentry.configureScope(scope => {
    scope.setUser({ email: kc.profile.email });
  });
  return kc;
}
export { bootstrapKC };
