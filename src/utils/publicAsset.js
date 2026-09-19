// Public files are relative to the deployment base, never the current route.
export function publicAsset(path) {
  if (!path) return '';
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  if (path.startsWith(base) && base !== '/') return path;
  return base + path.replace(/^(?:\.\/|\/)+/, '');
}
