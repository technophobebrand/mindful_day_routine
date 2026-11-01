const CACHE_NAME = 'mindful-day-cache-v1';
const urlsToCache = [
  '/mindful_day_routine/',
  '/mindful_day_routine/index.html',
  '/mindful_day_routine/manifest.json',
  '/mindful_day_routine/icons/icon-192x192.png',
  '/mindful_day_routine/icons/icon-512x512.png'
];

// Installatie van de Service Worker en bestanden cachen
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Geopende cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ophalen van bestanden via cache of netwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Oude caches opruimen bij updates
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
