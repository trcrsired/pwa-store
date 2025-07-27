const sharedFiles = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon.png"
];

self.addEventListener("message", (event) => {
  if (event.data?.type === "INIT_CACHE") {
    const cacheName = event.data.cacheName;
    caches.open(cacheName).then((cache) => {
      cache.addAll(sharedFiles);
    });
  }
});

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => clients.claim());

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
