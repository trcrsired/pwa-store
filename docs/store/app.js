import './content.js';

// Check scroll position and update button visibility
const updateScrollButtons = () => {
  const topBtn = document.getElementById('backToTop');
  const bottomBtn = document.getElementById('goToBottom');
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Show top button when scrolled down
  if (scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }

  // Show bottom button when not at bottom
  if (scrollY < docHeight - 100) {
    bottomBtn.style.display = 'block';
  } else {
    bottomBtn.style.display = 'none';
  }
};

// Expose globally for content.js to call after render
window.updateScrollButtons = updateScrollButtons;

// 🔁 Show/hide buttons on scroll
window.addEventListener('scroll', updateScrollButtons);

// 🔁 Initial check when page loads
window.addEventListener('load', updateScrollButtons);

// Also check after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Slight delay to let content render
  setTimeout(updateScrollButtons, 100);
});

// ⬆️ Scroll to top when button is clicked
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ⬇️ Scroll to bottom when button is clicked
document.getElementById('goToBottom').addEventListener('click', () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
});