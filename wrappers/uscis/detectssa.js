const jumplink = document.getElementById("jump-link");
jumplink.href = window.appConfig.url;
jumplink.textContent = `Jump to ${jumplink.href}`;

const ua = navigator.userAgent;
const isMobileOS = /Android|iPhone|iPad|iPod/i.test(ua);
const supportSSA = ua.includes("Chrome") && !isMobileOS;

if (supportSSA) {

  // Create and append edge-note dynamically if not present
  const note = document.createElement("p");
  note.id = "edge-note";
  note.style.marginTop = "20px";
  note.style.color = "gray";
  note.style.fontSize = "0.9em";
  note.textContent =
    "ℹ️ Your browser supports Single Site Apps (SSA), so this wrapper is unnecessary. Go to the website and then use your browser’s ‘Apps’ menu to install directly.";
  document.body.appendChild(note);
}
