if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js") // Adjust path if your service worker is elsewhere
    .then((registration) => {
      console.log("✅ Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("❌ Service Worker registration failed:", error);
    });
}