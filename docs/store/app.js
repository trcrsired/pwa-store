import './content.js';

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js") // Adjust path if your service worker is elsewhere
      .then((registration) => {
        console.log("✅ Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.toggle("dark", isDarkMode);
