export function backOrFallback(router, fallback = '/') {
  // Vue Router records an app-relative back entry only after in-app navigation.
  // External browser history must not be used as a "back to this site" target.
  const back = router.options.history.state.back;
  if (typeof back === 'string' && back.startsWith('/') && !back.startsWith('//') && router.resolve(back).matched.some(record => !record.meta.notFound)) {
    return router.back();
  }
  return router.replace(fallback);
}
