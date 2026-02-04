import "./style.css";


/* =========================
   MOBILE MENU TOGGLE
========================= */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!expanded));
  });
}

/* =========================
   DARK / LIGHT MODE TOGGLE
========================= */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlElement = document.documentElement;

function updateAriaLabel() {
  if (!themeToggleBtn) return;

  themeToggleBtn.setAttribute(
    "aria-label",
    htmlElement.classList.contains("dark")
      ? "Switch to light mode"
      : "Switch to dark mode"
  );
}

if (themeToggleBtn && themeIcon) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    htmlElement.classList.add("dark");
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }

  updateAriaLabel();

  themeToggleBtn.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");
    const isDark = htmlElement.classList.contains("dark");

    themeIcon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateAriaLabel();
  });
}

/* =========================
   SLIDER (INDEX PAGE ONLY)
========================= */
const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextSlide");
const prevBtn = document.getElementById("prevSlide");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
  });
}

if (slides.length && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}


lucide.createIcons();

