/* Meal Planner — Service Worker Offline First */
const CACHE = 'meal-planner-v2';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './css/fonts.css',
  './js/app.js',
  './js/db.js',
  './js/utils.js',
  './js/data/meals.js',
  './js/data/shopping.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './fonts/dmsans-latin.woff2',
  './fonts/dmsans-latin-ext.woff2',
  './fonts/outfit-latin.woff2',
  './fonts/outfit-latin-ext.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Ne jamais intercepter les requêtes cross-origin (évite CORS / undefined)
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetched = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached || Response.error());

      return cached || fetched;
    })
  );
});
