const CACHE_NAME = 'kalmykia-site-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/history.html',
  '/attractions.html',
  '/contacts.html',
  '/style.css',
  '/send_feedback.php',
  'icons/icon-512x512.png',
  '/khurul2.jpg',
  '/pagoda.jpg',
  '/topol.jpg',
  '/manych.jpg',
  '/pink.jpg',
  '/khurul.jpg',
  '/IZO.jpg',
  '/dance.jpg',
  '/music.jpg',
  '/lit.jpg',
  '/step.jpg'
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
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});