function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
         window.navigator.standalone === true;
}

function hasBeenInstalled(key) {
  return localStorage.getItem(key) === "true";
}

function isMyPWAStore(expectedId) {
  return window.appConfig?.id === expectedId;
}

function setupInstallUI(statusEl, installBtn, localStorageKey) {
  statusEl.textContent = "Please install this app to continue.";
  installBtn.style.display = "inline-block";

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installBtn.onclick = () => {
      e.prompt();
      localStorage.setItem(localStorageKey, "true");
      statusEl.textContent = "Thanks! You can now launch the PWA from your home screen.";
      installBtn.style.display = "none";
    };
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const { url, localStorageKey, id } = window.appConfig;
  const statusEl = document.getElementById("status");
  const installBtn = document.getElementById("install");

  const isStore = isMyPWAStore("https://trcrsired.github.io/pwa-store");
  const installed = hasBeenInstalled(localStorageKey);
  const standalone = isStandalone();

  if (isStore) {
    statusEl.textContent = "You're running the PWA Store.";
    installBtn.style.display = "none";
  } else if (standalone || installed) {
    window.location.href = url;
  } else {
    setupInstallUI(statusEl, installBtn, localStorageKey);
  }
});
