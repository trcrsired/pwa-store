const yearSpan = document.getElementById("footer-year");
const currentYear = new Date().getFullYear();

if (currentYear <= 2025) {
    yearSpan.textContent = "2025";
} else {
    yearSpan.textContent = `2025 - ${currentYear}`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

let tapCount = 0;

yearSpan.addEventListener("click", () => {
    ++tapCount;

    if (tapCount >= 5) {
        const enabled = localStorage.getItem("hiddenfeatures") === "true";

        if (enabled) {
            localStorage.removeItem("hiddenfeatures");
            showToast("Hidden features disabled");
        } else {
            localStorage.setItem("hiddenfeatures", "true");
            showToast("Hidden features enabled");
        }

        tapCount = 0;
    }
});
