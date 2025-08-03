const CACHE_NAME = "pwa-store-cache-v0";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/logo/logo.webp",
        "/content.js",
        "/app.js",
        "/style.css",
      ]);
    })
  );
  self.skipWaiting(); // Activate immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔥 delete old cache
          }
        })
      )
    )
  );
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            cache.put(event.request, networkResponse.clone()); // ← updates cache
          }
          return networkResponse;
        });

        return cachedResponse || fetchPromise;
      })
    )
  );
});
