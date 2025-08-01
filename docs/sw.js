const version = 9;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-store").then((cache) => {
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
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  clients.claim(); // Take control of pages
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch((err) => console.error("Service Worker failed:", err));
}
