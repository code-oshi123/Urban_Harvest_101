// Mobile menu toggle
document.addEventListener("click", (e) => {
  if (e.target.id === "menuBtn") {
    document.getElementById("mobileMenu")?.classList.toggle("hidden");
  }
});
