// shared/install-check.js
function isPWAInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches ||
         window.navigator.standalone === true;
}

window.addEventListener("DOMContentLoaded", () => {
  const { url, localStorageKey } = window.appConfig;
  const statusEl = document.getElementById("status");
  const installBtn = document.getElementById("install");

  const installed = localStorage.getItem(localStorageKey) === "true";

  if (isPWAInstalled() || installed) {
    window.location.href = url;
  } else {
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
});
