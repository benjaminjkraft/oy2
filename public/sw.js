const CACHE_NAME = 'oy-v3';
const CORE_ASSETS = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon.svg',
  '/oy.wav',
];

// Install - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.error('Failed to cache assets:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch - network first, fall back to cache
self.addEventListener('fetch', (event) => {
  // API requests - network only
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isStaticAsset = isSameOrigin && (url.pathname.startsWith('/assets/') || CORE_ASSETS.includes(url.pathname));

  if (!isStaticAsset) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  let data = { title: 'Oy!', body: 'Someone sent you an Oy!' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-192.png',
    tag: data.tag || 'yo-notification',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    data: {
      url: data.url || '/',
    },
  };

  const notifyPromise = self.registration.showNotification(data.title, options);
  const broadcastPromise = clients
    .matchAll({ type: 'window', includeUncontrolled: true })
    .then((clientList) => {
      if (clientList.length === 0) {
        return;
      }
      for (const client of clientList) {
        client.postMessage({ type: 'push', payload: data });
      }
    });

  event.waitUntil(Promise.all([notifyPromise, broadcastPromise]));
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification?.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('navigate' in client) {
          return client.navigate(targetUrl).then(() => client.focus());
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
