const cache = new Map<string, string>();

export function getCachedUrl(shortId: string) {
  return cache.get(shortId);
}

export function setCachedUrl(shortId: string, originalUrl: string) {
  cache.set(shortId, originalUrl);
}
