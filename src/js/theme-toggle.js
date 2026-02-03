// DARK / LIGHT MODE
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlElement = document.documentElement;

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");

    const isDark = htmlElement.classList.contains("dark");
    themeIcon.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateAriaLabel();
  });

  function updateAriaLabel() {
    themeToggleBtn.setAttribute(
      "aria-label",
      htmlElement.classList.contains("dark")
        ? "Switch to light mode"
        : "Switch to dark mode"
    );
  }

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    htmlElement.classList.add("dark");
    themeIcon.textContent = "☀️";
    updateAriaLabel();
  }
}
