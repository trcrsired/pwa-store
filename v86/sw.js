self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-v86").then((cache) => {
      return cache.addAll([
        "/",           // Root page
        "/index.html", // Entry file
        "/manifest.json",
        "/icons/icon.png"
      ]);
    })
  );
  self.skipWaiting(); // Activate immediately
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
