export function isRunningStandalone(ignoreStandaloneLoginFlow = false) {
  return (
    !ignoreStandaloneLoginFlow &&
    window.matchMedia('(display-mode: standalone)').matches
  );
}
