const yearSpan = document.getElementById("footer-year");
const currentYear = new Date().getFullYear();

if (currentYear <= 2025) {
yearSpan.textContent = "2025";
} else {
yearSpan.textContent = `2025 - ${currentYear}`;
}

// Hidden unlock logic
let tapCount = 0;

yearSpan.addEventListener("click", () => {
++tapCount;
if (tapCount >= 5) {
    const enabled = localStorage.getItem("hiddenfeatures") === "true";
    if (enabled) {
        localStorage.removeItem("hiddenfeatures");
    } else {
        localStorage.setItem("hiddenfeatures", "true");
    }
    tapCount = 0;
}
setTimeout(() => tapCount = 0, 1500);
});
