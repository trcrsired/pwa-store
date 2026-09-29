function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
         window.navigator.standalone === true;
}

// Check if the URL contains ?source=pwa
function isFromPWA() {
  const params = new URLSearchParams(window.location.search);
  return params.get("source") === "pwa";
}

// Setup install prompt UI
function setupInstallUI(statusEl, installBtn) {
  if (!statusEl) return;

  if (isStandalone()) {
    // Show message if already in standalone mode
    statusEl.textContent = "Please install this app to continue. We have detected you are in PWA, you may need to open it in browser UI and then install it.";
  } else {
    // Show default install message
    statusEl.textContent = "Please install this app to continue.";
  }

  installBtn.style.display = "inline-block";

  // Listen for install prompt
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installBtn.onclick = () => {
      e.prompt();
      statusEl.textContent = "Thanks! You can now launch the PWA from your home screen.";
      installBtn.style.display = "none";
    };
  });
}

// Main logic: jump if launched from PWA, otherwise show install UI
function install_or_jump() {
  if (!window.appConfig) return;
  const { url } = window.appConfig;
  if (!url) return;
  const statusEl = document.getElementById("status");
  const installBtn = document.getElementById("install");

  if (isFromPWA()) {
    // If launched from PWA (via start_url), redirect immediately
    window.location.href = url;
  } else {
    // Otherwise, show install prompt UI
    setupInstallUI(statusEl, installBtn);
  }
}

window.addEventListener("DOMContentLoaded", install_or_jump);
install_or_jump();