/* eslint-disable */
import localforage from 'localforage';
import * as Sentry from '@sentry/browser';

function bootstrapKC(kc) {
  const oldLoadUserProfile = kc.loadUserProfile;
  kc.loadUserProfile = async function getUserProfile() {
    const oldProfile = await localforage.getItem('userProfile');
    if (navigator.onLine) {
      const profile = await oldLoadUserProfile();
      await localforage.setItem('userProfile', profile);
      kc.profile = profile;
    } else {
      kc.profile = oldProfile;
    }
    return kc.profile;
  };
  Sentry.configureScope(scope => {
    scope.setUser({ email: kc.profile.email });
  });
  return kc;
}
export { bootstrapKC };
export default bootstrapKC;
