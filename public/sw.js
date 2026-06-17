const CACHE_NAME = 'brotherfit-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and non-http
  if (!event.request.url.startsWith('http')) return;

  // Network first for API/Firebase calls
  if (
    event.request.url.includes('firestore') ||
    event.request.url.includes('firebase') ||
    event.request.url.includes('googleapis')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // Cache static assets
        if (res.ok && event.request.url.includes('/icons/')) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
