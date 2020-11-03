importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: '/manifest.json', revision: '1'},
  {url: '/nav.html', revision: '1'},
  {url: '/index.html', revision: '1' },
  {url: '/club.html', revision: '1' },
  {url: '/pages/standings.html', revision: '1' },
  {url: '/pages/saved.html', revision: '1' },
  {url: '/css/materialize.min.css', revision: '1' },
  {url: '/assets/premierLegue.png', revision: '1' },
  {url: '/assets/premierLegue-maskable.png', revision: '1' },
  {url: '/js/materialize.min.js', revision: '1' },
  {url: '/js/api.js', revision: '1' },
  {url: '/js/idb.js', revision: '1' },
  {url: '/js/db.js', revision: '1' },
  {url: '/js/nav.js', revision: '1' },
  {url: '/js/notifConfig.js', revision: '1' }
  ],{
    ignoreUrlParametersMatching: [/.*/]
  }
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxEntries: 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('notificationclick', function (event) {
  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log('Notification Click.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('https://google.com');
      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }

  event.notification.close();

});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});