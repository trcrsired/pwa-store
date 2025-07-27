// shared/sw-register.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw-register.js")
    .then((reg) => {
      const { cacheName } = window.appConfig;
      reg.active?.postMessage({ type: "INIT_CACHE", cacheName });
    });
}
