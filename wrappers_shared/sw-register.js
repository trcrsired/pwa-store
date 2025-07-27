// shared/sw-register.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../wrappers_shared/sw-register.js")
    .then((reg) => {
      const { cacheName } = window.appConfig;
      reg.active?.postMessage({ type: "INIT_CACHE", cacheName });
    });
}
