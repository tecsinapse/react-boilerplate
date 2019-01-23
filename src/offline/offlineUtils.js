export function isRunningStandalone() {
  return (window.matchMedia('(display-mode: standalone)').matches);
}
