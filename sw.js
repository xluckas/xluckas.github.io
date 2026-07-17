const CACHE_NAME = 'finflow-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache hit if found, otherwise fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
