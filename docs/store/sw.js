const CACHE_NAME = "pwa-store-cache-v72";
const IMAGE_CACHE = "pwa-store-images-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./manifest.json",
        "./logo/logo.webp",
        "./content.js",
        "./app.js",
        "./lang.js",
        "./year.js",
        "./sw-register.js",
        "./style.css",
        "./how/en/",
        "./how/zh/",
        "./wechat/enus/",
        "./wechat/zhcn/",
        "./wechat/enus/01.webp",
        "./wechat/enus/02.webp",
        "./wechat/enus/03.webp",
        "./lang/en.json",
        "./lang/zh.json",
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
          if (key !== CACHE_NAME && key !== IMAGE_CACHE) {
            return caches.delete(key); // 🔥 delete old cache
          }
        })
      )
    )
  );
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  if (req.destination === "image" && !req.url.includes("./logo/logo.webp"))
  {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const fetchAndCache = fetch(req)
            .then((res) => {
              if (res && res.status === 200) {
                cache.put(req, res.clone());
              }
              return res;
            })
            .catch(() => cached); // fallback to cache if offline

          return cached || fetchAndCache;
        })
      )
    );
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === "basic"
            ) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // 🛑 Network failed — return cached response if available
            return cachedResponse;
          });

        // ✅ Return cached first, then update in background
        return cachedResponse || fetchPromise;
      })
    )
  );
});
