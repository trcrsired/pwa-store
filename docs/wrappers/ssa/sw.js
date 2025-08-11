const CACHE_VERSION = "v0";
const CACHE_NAME = `pwa-cache-${CACHE_VERSION}`;

const sharedFiles = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon.webp",
  "./styles.css",
  "./sw-register.js",
  "./install-check.js",
  "./config.js",
  "./offline.html", // ✅ Make sure this exists
];

// Install: cache all shared files immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(sharedFiles).catch((err) => {
        console.warn("Cache addAll failed during install:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fallback to network, fallback to offline page
self.addEventListener("fetch", (event) => {
  const request = event.request;

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request).catch(() => {
          if (request.mode === "navigate") {
            return caches.match("./offline.html");
          }
        })
      );
    })
  );
});
