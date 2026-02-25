const CACHE_NAME = "pwa-store-cache-v45";
const IMAGE_CACHE = "pwa-store-images-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/store/",
        "/store/manifest.json",
        "/store/logo/logo.webp",
        "/store/content.js",
        "/store/app.js",
        "/store/lang.js",
        "/store/year.js",
        "/store/sw-register.js",
        "/store/style.css",
        "/store/how/en/",
        "/store/how/zh/",
        "/store/wechat/enus/",
        "/store/wechat/zhcn/",
        "/store/wechat/enus/01.webp",
        "/store/wechat/enus/02.webp",
        "/store/wechat/enus/03.webp",
        "/store/lang/zh.json",
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

  if (req.destination === "image" && !req.url.includes("/store/logo/logo.webp"))
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
