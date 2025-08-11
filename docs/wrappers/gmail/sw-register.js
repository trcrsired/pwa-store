// shared/sw-register.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
