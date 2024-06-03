// Nom du cache
const cacheName = 'v1';

// Fichiers à mettre en cache
const cacheAssets = [
  'index.html',
  
  'favicon.png'
];

// Installation du Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Mise en cache des fichiers');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', e => {
  console.log('Service Worker: Activé');
  // Nettoyage des anciens caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Nettoyage du cache ancien');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Récupération des requêtes fetch
self.addEventListener('fetch', e => {
  console.log('Service Worker: Récupération');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});