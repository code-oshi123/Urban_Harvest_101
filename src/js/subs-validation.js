const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("form-message");

if (form && emailInput && message) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      message.textContent = "Email is required.";
      message.className = "text-red-600";
      return;
    }

    if (!emailRegex.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.className = "text-red-600";
      return;
    }

    // Success
    message.textContent = "Subscribed successfully!";
    message.className = "text-green-600";
    form.reset();
  });
}

