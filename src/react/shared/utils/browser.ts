export function getBasePath() {
  return window.location.pathname.split('/').slice(0, -1)[0];
}
