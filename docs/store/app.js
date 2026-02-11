import './content.js';

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

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.toggle("dark", isDarkMode);

// 🔁 Show/hide "Back to Top" button on scroll
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// ⬆️ Scroll to top when button is clicked
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
