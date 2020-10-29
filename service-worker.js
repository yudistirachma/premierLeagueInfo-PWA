const CACHE_NAME = 'football';
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/club.html",
  "/pages/standings.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/assets/premierLegue.png",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/nav.js",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  const BASE_URL = "https://api.football-data.org/v2/";
  const API_TOKEN = "975306a677b5443a907de9b44516c82a";
  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request, { headers: { 'X-Auth-Token' : API_TOKEN } })
        .then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request, { headers: { 'X-Auth-Token' : API_TOKEN } });
      })
    )
  }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});