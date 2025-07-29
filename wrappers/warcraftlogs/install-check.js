function hasBeenInstalled(key) {
  return localStorage.getItem(key) === "true";
}

function setupInstallUI(statusEl, installBtn, localStorageKey) {
  if (!statusEl)
  {
    return;
  }
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

function install_or_jump()
{
  if (!window.appConfig) return;
  const { url, localStorageKey } = window.appConfig;
  const statusEl = document.getElementById("status");
  const installBtn = document.getElementById("install");

  const installed = hasBeenInstalled(localStorageKey);
 
  if (installed) {
    window.location.href = url;
  } else {
    setupInstallUI(statusEl, installBtn, localStorageKey);
  }
}

window.addEventListener("DOMContentLoaded", install_or_jump);
install_or_jump();
